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
    end=arrow.now().floor("day").format(arrow.FORMAT_RFC3339).replace(" ", "T"),
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
        {"$match": {"timestamp": {"$gte": arrow.now().shift(weeks=-1).datetime}}},
        {
            "$setWindowFields": {
                "partitionBy": "$symbol",
                "sortBy": {"timestamp": 1},
                "output": {"last": {"$shift": {"output": "$close", "by": -1}}},
            }
        },
        {
            "$set": {
                "change": {
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
                }
            }
        },
        {"$set": {"changePercent": {"$round": [{"$divide": ["$change", "$last"]}, 4]}}},
        {"$match": {"last": {"$ne": None}}},
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

portfolios = db["portfolios"]
portfolio_history = db["portfolio_history"]

portfolio_history.create_index(
    [("timestamp", pymongo.DESCENDING), ("portfolio", pymongo.ASCENDING)],
    unique=True,
    background=True,
)

"""
Aggregate to calculate each portfolio's closing value
"""
portfolios.aggregate(
    [
        {"$addFields": {"asset": {"$objectToArray": "$assets"}}},
        {"$unwind": "$asset"},
        {
            "$lookup": {
                "from": "prices",
                "localField": "asset.k",
                "foreignField": "symbol",
                "pipeline": [{"$sort": {"timestamp": -1}}, {"$limit": 1}],
                "as": "price",
            }
        },
        {"$unwind": "$price"},
        {
            "$group": {
                "_id": "$_id",
                "value": {"$sum": {"$multiply": ["$asset.v", "$price.close"]}},
                "timestamp": {"$first": "$price.timestamp"},
                "cash": {"$first": "$cash"},
                "user": {"$first": "$user"},
            }
        },
        {
            "$set": {
                "value": {"$round": [{"$sum": ["$value", "$cash"]}, 2]},
                "timestamp": {"$dateTrunc": {"date": "$timestamp", "unit": "day"}},
                "portfolio": "$_id",
            }
        },
        {"$unset": "_id"},
        {
            "$merge": {
                "into": "portfolio_history",
                "on": ["timestamp", "portfolio"],
                "whenMatched": "replace",
                "whenNotMatched": "insert",
            }
        },
    ]
)

"""
Aggregate to calculate each portfolio's closing value
"""
portfolio_history.aggregate(
    [
        {"$sort": {"timestamp": -1}},
        {
            "$group": {
                "_id": "$user",
                "timestamp": {"$first": "$timestamp"},
                "value": {"$first": "$value"},
                "user": {"$first": "$user"},
                "cash": {"$first": "$cash"},
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user",
                "foreignField": "_id",
                "as": "user",
            }
        },
        {"$unwind": {"path": "$user"}},
        {"$unset": ["user.dob", "user.email", "user.password", "user.__v"]},
        {"$out": "leaderboard"},
    ]
)
