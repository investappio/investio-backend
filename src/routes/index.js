const Router = require('@koa/router')
const auth = require('./auth')
const user = require('./user')
const stocks = require('./stocks')

const router = new Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/stocks', stocks)

module.exports = router.routes()
