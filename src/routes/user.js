const Router = require('@koa/router')
const { User, Leaderboard } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const users = await User.search(query)

  ctx.body.success = true
  ctx.body.users = users
})

router.get('/leaderboard', async (ctx) => {
  ctx.body = {}

  const { start, count } = ctx.request.query

  const leaderboard = await Leaderboard.getLeaders({ start, count })

  ctx.body.success = true
  ctx.body.leaderboard = leaderboard
})

async function getPortfolio (ctx) {
  ctx.body = {}

  const portfolio = await (ctx.targetUser || ctx.user).getPortfolio()

  ctx.body.success = true
  ctx.body.portfolio = portfolio
}

async function getProfile (ctx) {
  ctx.body = {}

  ctx.body.success = true
  ctx.body.profile = ctx.targetUser || ctx.user
}

async function getOrders (ctx) {
  ctx.body = {}

  const { start, count } = ctx.request.query
  const portfolio = await (ctx.targetUser || ctx.user).getPortfolio()

  ctx.body.success = true
  ctx.body.orders = await portfolio.getOrderHistory({ start, count })
}

router.get('/profile', getProfile)

router.get('/portfolio', getPortfolio)

router.get('/orders', getOrders)

router.get('/portfolio/historical/:range', async (ctx) => {
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

  const portfolio = await ctx.user.getPortfolio()
  const history = await portfolio.getValueHistory({ duration })

  ctx.body.success = true
  ctx.body.history = history
})

router.use('/:user',
  async (ctx, next) => {
    const user = await User.findOne({ username: ctx.params.user })

    if (user) {
      ctx.targetUser = user
      await next()
    } else {
      ctx.response.body = { success: false }
      ctx.response.status = 404
    }
  }, (new Router())
    .get('/', getProfile)
    .get('/portfolio', getPortfolio)
    .get('/orders', getOrders)
    .get('/following', async (ctx) => {
      ctx.body = {}
      ctx.body.following = ctx.user.following(ctx.targetUser)
    })
    .post('/follow', async (ctx) => {
      ctx.body = {}
      ctx.body.success = await ctx.user.follow(ctx.targetUser)
    })
    .routes()
)

module.exports = router.routes()
