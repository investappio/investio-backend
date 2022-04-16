const Router = require('@koa/router')
const { Stock } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const res = await Stock.search(query)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.get('/gainers', async (ctx) => {
  ctx.body = {}

  const { count } = ctx.request.query

  const res = await Stock.topGainers(count || 5)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.use('/:symbol',
  async (ctx, next) => {
    const stock = await Stock.findOne({ symbol: ctx.params.symbol })
    ctx.stock = stock
    await next()
  }, (new Router())
    .post('/buy', async (ctx) => {
      ctx.body = {}

      const { quantity } = ctx.request.body

      const portfolio = await ctx.user.getPortfolio()
      ctx.body.success = await portfolio.buy(ctx.stock, quantity || 0)
      ctx.body.portfolio = portfolio
    })
    .post('/sell', async (ctx) => {
      ctx.body = {}

      const { quantity } = ctx.request.body

      const portfolio = await ctx.user.getPortfolio()
      ctx.body.success = await portfolio.sell(ctx.stock, quantity || 0)
      ctx.body.portfolio = portfolio
    })
    .get('/price', async (ctx) => {
      ctx.body = {}

      ctx.body.success = true
      ctx.body.price = ctx.stock.price.close
    })
    .get('/price/historical/:range', async (ctx) => {
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

      const res = await ctx.stock.getPriceHistory({ duration })

      ctx.body.success = true
      ctx.body.prices = res
    })
    .routes()
)

module.exports = router.routes()
