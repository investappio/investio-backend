const Router = require('@koa/router')
const { Stock } = require('../models')

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
  ctx.body.stocks = await Promise.all(res.map(async stock => {
    const s = stock.toObject()
    s.price = (await stock.getClosePrice()).close
    return s
  }))
})

module.exports = router.routes()
