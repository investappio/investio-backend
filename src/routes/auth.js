const Router = require('@koa/router')

const router = new Router()

router.post('/register', async (ctx) => {
  ctx.body = {}
})

module.exports = router.routes()
