from pymongo import MongoClient
import arrow

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient(
    "mongodb://investio:password@mongo:27017/investio?authSource=admin&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false"
)
result = client["investio"]["prices"].aggregate(
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
                        "$cond": [
                            {"$eq": ["$last", None]},
                            0,
                            {"$subtract": ["$close", "$last"]},
                        ]
                    },
                }
            }
        },
        {"$unset": "last"},
    ]
)

print(list(result))
