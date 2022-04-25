const Router = require('@koa/router')
const { Asset } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  const query = ctx.request.query.query || ''

  const res = await Asset.search(query)

  ctx.body.success = true
  ctx.body.assets = res
})

router.get('/movers', async (ctx) => {
  ctx.body = {}

  const count = ctx.request.query.count || 5

  const gainers = await Asset.topGainers(count)
  const losers = await Asset.topLosers(count)

  const res = [...gainers, ...losers].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))

  ctx.body.success = true
  ctx.body.assets = res.slice(0, count)
})

router.get('/quotes', async (ctx) => {
  ctx.body = {}

  const symbols = ctx.request.query.symbols || ''

  ctx.body.quotes = await Asset.fetchQuotes(symbols.split(','))
  ctx.body.success = true
})

router.get('/:symbol', async (ctx) => {
  ctx.body = {}

  const { symbol } = ctx.params

  const res = await Asset.findOne({ symbol })

  ctx.body.success = true
  ctx.body.asset = res
})

router.post('/:symbol/buy', async (ctx) => {
  ctx.body = {}

  const { symbol } = ctx.params
  const { qty, notional } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  ctx.body.success = await portfolio.buy(symbol, qty, notional)
})

router.post('/:symbol/sell', async (ctx) => {
  ctx.body = {}

  const { symbol } = ctx.params
  const { qty, notional } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  ctx.body.success = await portfolio.sell(symbol, qty, notional)
})

router.get('/:symbol/quote', async (ctx) => {
  ctx.body = {}

  const { symbol } = ctx.params

  ctx.body.quote = await Asset.fetchQuote(symbol)
  ctx.body.success = true
})

router.get('/:symbol/price/historical/:range', async (ctx) => {
  ctx.body = {}

  const { symbol, range } = ctx.params

  const duration = (() => {
    switch (range) {
      case '3m':
        return { months: 3 }
      case '1y':
        return { years: 1 }
      default:
        return { weeks: 2 }
    }
  })()

  const asset = await Asset.findOne({ symbol })
  const res = await asset.getPriceHistory({ duration })

  ctx.body.success = true
  ctx.body.prices = res
})

module.exports = router.routes()
