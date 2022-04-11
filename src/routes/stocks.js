const Router = require('@koa/router')
const { Stock, Price } = require('../models')

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

router.get('/price', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    console.log(ctx.request.headers)
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { query } = ctx.request.query
  const res = await Price.search(query)

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

  const symbols = await Stock.topGainers(10)
  const res = await Stock.find({ symbol: { $in: symbols } })

  ctx.body.success = true
  ctx.body.stocks = res
})

module.exports = router.routes()
