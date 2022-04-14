const Router = require('@koa/router')
const { User } = require('../models')
const { authentication } = require('../utils')

const router = new Router()

router.get('/search', authentication, async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const res = await User.search(query)

  ctx.body.success = true
  ctx.body.users = res
})

router.get('/portfolio', authentication, async (ctx) => {
  ctx.body = {}

  const portfolio = await ctx.user.getPortfolio()

  ctx.body.success = true
  ctx.body.portfolio = portfolio
})

router.post('/follow', authentication, async (ctx) => {
  ctx.body = {}

  const { uid } = ctx.request.body
  const user = await User.findById(uid)

  ctx.body.success = await ctx.user.follow(user)
})

module.exports = router.routes()
