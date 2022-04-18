const Alpaca = require('@alpacahq/alpaca-trade-api')
const redis = require('redis')

exports.normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number

  return false
}

exports.alpaca = new Alpaca({
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true
})

exports.redis = (() => {
  const client = redis.createClient({ url: `redis://:${process.env.REDIS_PASSWORD}@redis` })
  client.connect()
  return client
})()
