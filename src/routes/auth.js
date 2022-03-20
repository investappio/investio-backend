const Router = require('@koa/router')
const User = require('../models/user')

const router = new Router()

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
    ctx.body.err = err
  }
})

module.exports = router.routes()
