from datetime import datetime
import json
from utils import iex_request, mongo_client
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
        lambda stock: ReplaceOne(
            {"symbol": stock.get("symbol").lower()},
            dict(stock, **({"symbol": stock.get("symbol").lower()})),
            upsert=True,
        ),
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
        lambda price: dict(
            price,
            **(
                {
                    "symbol": price.get("symbol").lower(),
                    "date": datetime.strptime(price.get("date"), "%Y-%m-%d"),
                    "updated": datetime.fromtimestamp(
                        price.get("updated", 0.0) / 1000.0
                    ),
                    "stock": stocks.find_one({"symbol": price.get("symbol").lower()})["_id"],
                }
            )
        ),
        filter(lambda price: price.get("symbol") in symbols, market),
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
