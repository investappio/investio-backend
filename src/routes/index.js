const Router = require('@koa/router')
const auth = require('./auth')
const user = require('./user')

const router = new Router()

router.use('/auth', auth)
router.use('/user', user)

router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!'
})

module.exports = router.routes()
