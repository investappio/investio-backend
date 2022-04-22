const Router = require('@koa/router')
const auth = require('./auth')
const user = require('./user')
const assets = require('./assets')
const { authentication } = require('../utils/middleware')

const router = new Router()

router.use('/auth', auth)
router.use('/user', authentication, user)
router.use('/assets', authentication, assets)

module.exports = router.routes()
