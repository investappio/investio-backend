import os
from pymongo import MongoClient
from alpaca_trade_api.rest import REST


def mongo_client():
    MONGO_USERNAME = os.environ.get("MONGO_USERNAME")
    MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")
    MONGO_HOSTNAME = os.environ.get("MONGO_HOSTNAME")
    MONGO_DATABASE = os.environ.get("MONGO_DATABASE")

    return MongoClient(f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}")[
        MONGO_DATABASE
    ]


alpaca = REST(base_url="https://paper-api.alpaca.markets")
