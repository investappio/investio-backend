import json
from utils import iex_request, mongo_client, parse_price
import pymongo
from pymongo import ReplaceOne

db = mongo_client()

"""
Fetch all stocks and filter for those in the NYSE
"""

ref = json.loads(iex_request("/ref-data/symbols"))
nyse = list(filter(lambda x: x.get("exchange") == "XNYS", ref))

stocks = db["stocks"]

stocks.create_index([("name", pymongo.ASCENDING)], background=True)
stocks.create_index([("symbol", pymongo.ASCENDING)], unique=True, background=True)

# Bulk insert/replace the fetched stocks
stock_ops = list(
    map(
        lambda stock: ReplaceOne({"symbol": stock.get("symbol")}, stock, upsert=True),
        nyse,
    )
)

stocks.bulk_write(stock_ops)

"""
Fetch the market prices from the previous days of our updated stocks
"""

market = json.loads(iex_request("/stock/market/previous"))
symbols = set(map(lambda stock: stock.get("symbol"), nyse))

prices = db["prices"]

ohlc = list(
    map(
        lambda price: parse_price(price),
        filter(lambda mprice: mprice.get("symbol") in symbols, market),
    )
)

prices.create_index([("key", pymongo.ASCENDING)], background=True)
prices.create_index([("symbol", pymongo.ASCENDING)], background=True)
prices.create_index([("date", pymongo.ASCENDING)], background=True)

prices.create_index(
    [
        ("date", pymongo.ASCENDING),
        ("symbol", pymongo.ASCENDING),
    ],
    unique=True,
)

# Bulk insert/replace the fetched price info
price_ops = list(
    map(
        lambda price: ReplaceOne(
            {"symbol": price.get("symbol"), "date": price.get("date")},
            price,
            upsert=True,
        ),
        ohlc,
    )
)

prices.bulk_write(price_ops)
