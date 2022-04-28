const Alpaca = require('@alpacahq/alpaca-trade-api')
const redis = require('redis')
const EventEmitter = require('events')
const { WebSocket } = require('ws')
const axios = require('axios').default

exports.normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number

  return false
}

exports.filterUndefined = (obj) => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
}

exports.alpaca = new Alpaca({
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  verbose: true,
  paper: true
})

exports.iex = async (path, params = {}) => {
  const base = 'https://cloud.iexapis.com/stable'

  const res = await axios.get(`${base}/${path}`, {
    params: {
      token: process.env.IEX_TOKEN, ...params
    }
  })

  return res.data
}

exports.redis = (() => {
  const client = redis.createClient({ url: `redis://:${process.env.REDIS_PASSWORD}@redis` })
  client.connect()
  return client
})()

exports.newsStream = (() => {
  const emitter = new EventEmitter()
  const ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta1/news')

  ws.on('open', () => {
    ws.send(JSON.stringify({ action: 'auth', key: process.env.APCA_API_KEY_ID, secret: process.env.APCA_API_SECRET_KEY }))
  })

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString())
    const type = data[0].T

    if (type === 'success') {
      emitter.emit(data[0].msg)
    }

    if (type === 'subscription') {
      emitter.emit('subscribed')
    }

    if (type === 'n') {
      emitter.emit('news', data)
      return
    }

    console.log(data)
  })

  emitter.on('subscribe', (key, value) => {
    ws.send(JSON.stringify({ action: 'subscribe', [key]: value }))
  })

  return emitter
})()
