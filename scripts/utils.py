import os
import requests
from datetime import datetime
from pymongo import MongoClient


def mongo_client():
    MONGO_USERNAME = os.environ.get("MONGO_USERNAME")
    MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")
    MONGO_HOSTNAME = os.environ.get("MONGO_HOSTNAME")
    MONGO_DATABASE = os.environ.get("MONGO_DATABASE")

    return MongoClient(f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}")[
        MONGO_DATABASE
    ]


def iex_request(endpoint, token=None):
    TOKEN = os.environ.get("IEX_CLOUD_TOKEN")
    url = f"https://sandbox.iexapis.com/beta{endpoint}?token={token or TOKEN}"
    res = requests.get(url)
    return res.text


def parse_stock(stock):
    stock["date"] = datetime.strptime(stock["date"], "%Y-%m-%d")
    return stock
