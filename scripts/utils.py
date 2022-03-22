import os
import requests
from pymongo import MongoClient

def mongo_client():
  MONGO_USERNAME = os.environ.get("MONGO_USERNAME")
  MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")
  MONGO_HOSTNAME = os.environ.get("MONGO_HOSTNAME")
  MONGO_DATABASE = os.environ.get("MONGO_DATABASE")

  return MongoClient(f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}")[MONGO_DATABASE]

def iex_request(endpoint, token = None):
  url = f"https://sandbox.iexapis.com/beta{endpoint}?token={token or os.environ.get('IEX_CLOUD_TOKEN')}"
  res = requests.get(url)
  return res.text