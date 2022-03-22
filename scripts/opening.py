import json
from utils import iex_request

symbols = json.loads(iex_request("/ref-data/symbols"))
nyse = list(filter(lambda s: s["exchange"] == "XNYS", symbols))
tickers = set(map(lambda t: t["symbol"], nyse))

print(len(tickers))

market = json.loads(iex_request("/stock/market/previous"))
ohlc = list(filter(lambda o: o["symbol"] in tickers, market))

# print(ohlc)
print(len(ohlc))
