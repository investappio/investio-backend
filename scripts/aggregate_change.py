from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient(
    "mongodb://investio:password@mongo:27017/investio?authSource=admin&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false"
)
result = client["investio"]["prices"].aggregate(
    [
        {"$match": {"timestamp": {"$gte": "2022-04-10T04:00:00.000+00:00"}}},
        {
            "$group": {
                "_id": "$symbol",
                "first": {"$push": {"open": "$open", "close": "$close"}},
            }
        },
    ]
)

print(list(result))
