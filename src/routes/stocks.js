const Router = require('@koa/router')
const { DateTime } = require('luxon')
const { Stock, Price } = require('../models')
const { authentication } = require('../utils')

const router = new Router()

router.get('/search', authentication, async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const res = await Stock.search(query)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.get('/:symbol/price', authentication, async (ctx) => {
  ctx.body = {}

  const stock = await Stock.findOne({ symbol: ctx.params.symbol })

  ctx.body.success = true
  ctx.body.price = stock.price.close
})

router.get('/:symbol/price/historical', authentication, async (ctx) => {
  ctx.body = {}

  const { days, weeks, months, years, date } = ctx.request.query

  const duration = {
    days: days || 5,
    weeks: weeks || 0,
    months: months || 0,
    years: years || 0
  }

  const res = await Price.get(ctx.params.symbol, { date: date ? new DateTime(date) : DateTime.now(), duration })

  ctx.body.success = true
  ctx.body.prices = res
})

router.get('/gainers', authentication, async (ctx) => {
  ctx.body = {}

  const { count } = ctx.request.query

  const res = await Stock.topGainers(count || 5)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.post('/:symbol/buy', authentication, async (ctx) => {
  ctx.body = {}

  const { quantity } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  const stock = await Stock.findOne({ symbol: ctx.params.symbol })
  ctx.body.success = await portfolio.buy(stock, quantity || 0)
  ctx.body.portfolio = portfolio
})

router.post('/:symbol/sell', authentication, async (ctx) => {
  ctx.body = {}

  const { quantity } = ctx.request.body

  const portfolio = await ctx.user.getPortfolio()
  const stock = await Stock.findOne({ symbol: ctx.params.symbol })
  ctx.body.success = await portfolio.sell(stock, quantity || 0)
  ctx.body.portfolio = portfolio
})

module.exports = router.routes()
