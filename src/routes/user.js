const Router = require('@koa/router')
const { User } = require('../models')

const router = new Router()

router.get('/search', async (ctx) => {
  ctx.body = {}

  const { query } = ctx.request.query

  const res = await User.search(query)

  ctx.body.success = true
  ctx.body.users = res
})

async function getPortfolio (ctx) {
  ctx.body = {}

  const portfolio = await (ctx.targetUser || ctx.user).getPortfolio()

  ctx.body.success = true
  ctx.body.portfolio = portfolio
}

router.get('/portfolio', getPortfolio)

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
    .get('/portfolio', getPortfolio)
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
