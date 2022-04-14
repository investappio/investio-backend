const Router = require('@koa/router')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const router = new Router()

router.post('/login', async (ctx) => {
  ctx.body = {}

  const { username, email, password } = ctx.request.body

  const login = username || email

  const user = await User.authenticate(login, password)

  if (user) {
    ctx.body.success = true
    ctx.body.user = user
    ctx.body.token = await jwt.sign(user.toObject(), process.env.JWT_SECRET)
    return
  }

  ctx.body.success = false
})

router.post('/register', async (ctx) => {
  ctx.body = {}

  const {
    name, phone, email, dob, username, password
  } = ctx.request.body

  const user = new User({
    name,
    phone,
    email,
    dob: dob,
    username,
    password
  })

  try {
    await user.save()
  } catch (err) {
    ctx.body.success = false
    ctx.body.err = { ...(err.errors), ...(err.keyPattern) }
    return
  }

  ctx.body.success = true
  ctx.body.user = user
  ctx.body.token = await jwt.sign(user.toObject(), process.env.JWT_SECRET)
})

module.exports = router.routes()
