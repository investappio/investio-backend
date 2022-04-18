const { DateTime } = require('luxon')
const { alpaca, redis } = require('../utils')

const { Schema, model } = require('mongoose')
const Price = require('./price')

const assetSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  exchange: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})

async function getPriceHistory (opts) {
  const options = { ...{ date: DateTime.now(), duration: { weeks: 2 } }, ...opts }

  return Price.find({ symbol: this.symbol, date: { $lte: options.date.endOf('day'), $gte: options.date.minus(options.duration) } }).sort('-date')
}

assetSchema.method('getPriceHistory', getPriceHistory)

async function search (query) {
  return this.find({ $or: [{ symbol: { $regex: query, $options: 'i' } }, { name: { $regex: query, $options: 'i' } }] }).limit(25)
}

async function fetchPrice (symbol) {
  const key = `${symbol}/quotes/latest`
  const cached = await redis.get(key)
  const asset = await this.findOne({ symbol })

  const price = cached || await (async () => {
    const quote = (await alpaca.getLatestQuote(symbol)).AskPrice

    if (asset.active && quote === 0) {
      const ohlc = await Price.findOne({ symbol, timestamp: { $lte: DateTime.now() } }).sort('-timestamp')
      return ohlc.close
    }

    return quote
  })()

  if (cached == null) {
    await redis.set(key, price, 'EX', 60)
  }

  return price
}

assetSchema.static('search', search)
assetSchema.static('fetchPrice', fetchPrice)

module.exports = model('Asset', assetSchema)
