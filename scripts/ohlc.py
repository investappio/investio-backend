import json
from utils import iex_request, mongo_client, parse_stock
import pymongo

db = mongo_client()

ref = json.loads(iex_request("/ref-data/symbols"))
nyse = list(filter(lambda s: s["exchange"] == "XNYS", ref))
symbols = set(map(lambda t: t["symbol"], nyse))

market = json.loads(iex_request("/stock/market/previous"))
ohlc = list(filter(lambda o: o["symbol"] in symbols, market))

stocks = db["stocks"]

stocks.create_index([("key", pymongo.ASCENDING)], background=True)
stocks.create_index([("symbol", pymongo.ASCENDING)], background=True)
stocks.create_index([("date", pymongo.ASCENDING)], background=True)
stocks.create_index([("updated", pymongo.ASCENDING)], background=True)

stocks.create_index(
    [
        ("date", pymongo.ASCENDING),
        ("symbol", pymongo.ASCENDING),
    ],
    unique=True,
)

stocks.insert_many(list(map(lambda x: parse_stock(x), ohlc)))
