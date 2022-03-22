import json
from utils import iex_request

ref = json.loads(iex_request("/ref-data/symbols"))
nyse = list(filter(lambda s: s["exchange"] == "XNYS", ref))
symbols = set(map(lambda t: t["symbol"], nyse))

market = json.loads(iex_request("/stock/market/previous"))
ohlc = list(filter(lambda o: o["symbol"] in symbols, market))

print(ohlc)
