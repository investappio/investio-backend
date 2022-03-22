import os
import requests

def iex_request(endpoint, token = None):
  url = f"https://sandbox.iexapis.com/beta{endpoint}?token={token or os.environ.get('IEX_CLOUD_TOKEN')}"
  res = requests.get(url)
  return res.text