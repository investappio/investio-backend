const { User } = require('../models')

exports.authentication = async (ctx, next) => {
  ctx.assert(await User.find({ _id: ctx.state.user._id }).count() > 0, 401)
  ctx.user = User(ctx.state.user)
  await next()
}
