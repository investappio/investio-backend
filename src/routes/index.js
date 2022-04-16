const Router = require('@koa/router')
const auth = require('./auth')
const user = require('./user')
const stocks = require('./stocks')
const { authentication } = require('../utils')

const router = new Router()

router.use('/auth', auth)
router.use('/user', authentication, user)
router.use('/stocks', authentication, stocks)

module.exports = router.routes()
