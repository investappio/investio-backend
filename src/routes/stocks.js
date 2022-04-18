const Router = require('@koa/router')
const { Asset } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const res = await Asset.search(query)

  ctx.body.success = true
  ctx.body.stocks = res
})

// TODO: Adapt to Alpaca API
router.get('/gainers', async (ctx) => {
  ctx.body = {}

  const { count } = ctx.request.query

  const res = await Asset.topGainers(count || 5)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.post('/:symbol/buy', async (ctx) => {
  ctx.body = {}

  const { qty, notional } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  ctx.body.success = await portfolio.buy(ctx.params.symbol, qty, notional)
})

router.post('/:symbol/sell', async (ctx) => {
  ctx.body = {}

  const { qty, notional } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  ctx.body.success = await portfolio.sell(ctx.params.symbol, qty, notional)
})

router.get('/:symbol/price', async (ctx) => {
  ctx.body = {}

  ctx.body.price = await Asset.fetchPrice(ctx.params.symbol)
  ctx.body.success = true
})

router.get('/:symbol/price/historical/:range', async (ctx) => {
  ctx.body = {}

  const duration = (() => {
    switch (ctx.params.range) {
      case '3m':
        return { months: 3 }
      case '1y':
        return { years: 1 }
      default:
        return { weeks: 2 }
    }
  })()

  const asset = await Asset.findOne({ symbol: ctx.params.symbol })
  const res = await asset.getPriceHistory({ duration })

  ctx.body.success = true
  ctx.body.prices = res
})

module.exports = router.routes()
