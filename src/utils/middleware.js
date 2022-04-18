const { User } = require('../models')

exports.authentication = async (ctx, next) => {
  ctx.assert(ctx.state.user != null, 401)
  ctx.user = User(ctx.state.user)
  await next()
}
