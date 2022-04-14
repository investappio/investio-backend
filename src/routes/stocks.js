const Router = require('@koa/router')
const { DateTime } = require('luxon')
const { Stock, Price, User } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    console.log(ctx.request.headers)
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { query } = ctx.request.query

  const res = await Stock.search(query)

  ctx.body.success = true
  ctx.body.stocks = res
})

router.get('/:symbol/price', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    console.log(ctx.request.headers)
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { days, weeks, months, years, date } = ctx.request.query

  const duration = {
    days: days || 5,
    weeks: weeks || 0,
    months: months || 0,
    years: years || 0
  }

  const res = await Price.get(ctx.params.symbol, { date: date ? DateTime(date) : null, duration })

  ctx.body.success = true
  ctx.body.prices = res
})

router.get('/gainers', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    console.log(ctx.request.headers)
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { count } = ctx.request.query

  const symbols = await Stock.topGainers(count || 10)
  const res = await Stock.find({ symbol: { $in: symbols } })

  ctx.body.success = true
  ctx.body.stocks = res
})

router.post('/:symbol/buy', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    console.log(ctx.request.headers)
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const user = User(ctx.state.user)
  const portfolio = await user.getPortfolio()
  const stock = await Stock.findOne({ symbol: ctx.params.symbol })
  await portfolio.buy(stock, 1)
})

module.exports = router.routes()
