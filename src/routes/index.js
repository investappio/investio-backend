const Router = require('@koa/router')
const auth = require('./auth')

const router = new Router()

router.use('/auth', auth)

router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!'
})

module.exports = router.routes()
