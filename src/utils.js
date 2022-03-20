exports.normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number

  return false
}
