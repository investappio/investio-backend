const Router = require('@koa/router')
const { User } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { query } = ctx.request.query

  const res = await User.search(query)

  ctx.body.success = true
  ctx.body.users = res
})

router.get('/portfolio', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const user = new User(ctx.state.user)
  const portfolio = await user.getPortfolio()

  ctx.body.success = true
  ctx.body.portfolio = portfolio
})

router.post('/follow', async (ctx) => {
  ctx.body = {}

  if (!ctx.state.user) {
    ctx.body.success = false
    ctx.status = 401
    return
  }

  const { uid } = ctx.request.body
  const user = await User.findById(uid)

  ctx.body.success = await new User(ctx.state.user).follow(user)
})

module.exports = router.routes()
