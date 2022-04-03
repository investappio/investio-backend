const Router = require('@koa/router')
const Stocks = require('../models/stocks')

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

  const res = await Stocks.search(query)

  ctx.body.success = true
  ctx.body.stocks = res
})

module.exports = router.routes()
