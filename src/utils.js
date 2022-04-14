const { User } = require('./models')

exports.normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number

  return false
}

exports.authentication = async (ctx, next) => {
  ctx.assert(ctx.state.user != null, 401)
  ctx.user = User(ctx.state.user)
  await next()
}
