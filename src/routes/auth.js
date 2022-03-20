const Router = require('@koa/router')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const router = new Router()

router.post('/login', async (ctx) => {
  ctx.body = {}

  const { username, email, password } = ctx.request.body

  const login = username || email

  const { password: _, ...user } = (await User.authenticate(login, password)).toObject()

  const token = jwt.sign(user, process.env.JWT_SECRET)

  ctx.body.user = user
  ctx.body.token = token
})

router.post('/renew', async (ctx) => {
  ctx.body = {}
  // TODO: Revoke and renew the jwt token
  ctx.body = ctx.state.user
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
    dob: dob * 1000,
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
})

module.exports = router.routes()
