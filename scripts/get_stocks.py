import arrow
from utils import alpaca, mongo_client
from alpaca_trade_api import TimeFrame
import pymongo
from pymongo import UpdateOne

db = mongo_client()

"""
Fetch all stocks and filter for those in the NYSE
"""
markets = set(["NYSE", "NASDAQ"])
asset_list = list(
    filter(lambda a: (a.exchange in markets), alpaca.list_assets(status="active"))
)

assets = db["assets"]

assets.create_index([("name", pymongo.ASCENDING)], background=True)
assets.create_index([("active", pymongo.DESCENDING)], background=True)
assets.create_index([("symbol", pymongo.ASCENDING)], unique=True, background=True)

asset_transform = lambda easy_to_borrow=None, fractionable=None, id=None, marginable=None, shortable=None, tradable=None, status=None, **asset: dict(
    asset, **({"active": status == "active"})
)

# Bulk insert/replace the fetched assets
assets.bulk_write(
    list(
        map(
            lambda asset: UpdateOne(
                {"symbol": asset.symbol},
                {"$set": asset_transform(**asset._raw)},
                upsert=True,
            ),
            asset_list,
        )
    )
)

"""
Fetch the market prices from the previous days of our updated stocks
"""
symbols = list(map(lambda a: a.symbol, asset_list))

ohlc = alpaca.get_bars(
    symbol=list(symbols),
    timeframe=TimeFrame.Day,
    start=arrow.now()
    .floor("day")
    .shift(weeks=-1)
    .format(arrow.FORMAT_RFC3339)
    .replace(" ", "T"),
    end=arrow.now().floor("hour").format(arrow.FORMAT_RFC3339).replace(" ", "T"),
    adjustment="all",
)

prices = db["prices"]

prices.create_index([("symbol", pymongo.ASCENDING)], background=True)
prices.create_index([("timestamp", pymongo.DESCENDING)], background=True)
prices.create_index(
    [("timestamp", pymongo.DESCENDING), ("symbol", pymongo.ASCENDING)],
    unique=True,
    background=True,
)

prices.bulk_write(
    list(
        map(
            lambda price: UpdateOne(
                {"symbol": price.S, "timestamp": arrow.get(price.t).datetime},
                {
                    "$set": {
                        "symbol": price.S,
                        "timestamp": arrow.get(price.t).datetime,
                        "open": price.o,
                        "high": price.h,
                        "low": price.l,
                        "close": price.c,
                        "volume": price.v,
                        "trades": price.n,
                        "average": price.vw,
                    }
                },
                upsert=True,
            ),
            ohlc,
        )
    )
)

"""
Aggregate to set/update change value of prices
"""
prices.aggregate(
    [
        {
            "$setWindowFields": {
                "partitionBy": "$symbol",
                "sortBy": {
                    "timestamp": 1,
                },
                "output": {
                    "last": {
                        "$shift": {
                            "output": "$close",
                            "by": -1,
                        },
                    },
                },
            },
        },
        {
            "$replaceWith": {
                "$setField": {
                    "field": "change",
                    "input": "$$CURRENT",
                    "value": {
                        "$round": [
                            {
                                "$cond": [
                                    {"$eq": ["$last", None]},
                                    0,
                                    {"$subtract": ["$close", "$last"]},
                                ]
                            },
                            2,
                        ]
                    },
                }
            }
        },
        {"$unset": "last"},
        {
            "$merge": {
                "into": "prices",
                "on": "_id",
                "whenMatched": "replace",
                "whenNotMatched": "insert",
            }
        },
    ]
)
