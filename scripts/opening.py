import json
from utils import iex_request

symbols = json.loads(iex_request('/ref-data/symbols', 'Tpk_5d0ba7d81e624a528b6e8800be86f6b9'))
nyse = list(filter(lambda s: s['exchange'] == 'XNYS', symbols))

print(nyse)
