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

assetSchema.index({ name: 'text', symbol: 'text' })

async function getPriceHistory (opts) {
  const options = { ...{ date: DateTime.now(), duration: { weeks: 2 } }, ...opts }

  return Price.find({
    symbol: this.symbol,
    date: {
      $lte: options.date.endOf('day'),
      $gte: options.date.minus(options.duration)
    }
  }).sort('-date')
}

assetSchema.method('getPriceHistory', getPriceHistory)

async function search (query) {
  return this.find({
    $or: [
      { symbol: { $regex: query, $options: 'i' } },
      { $text: { $search: query } }
    ]
  }).limit(25)
}

async function topGainers (count) {
  return Price.find({}).sort([
    ['timestamp', -1],
    ['changePercent', -1]
  ]).limit(count)
}

async function fetchQuote (symbol) {
  const key = `${symbol}/quotes/latest`
  const cached = await redis.get(key)
  const asset = await this.findOne({ symbol })

  const quote = cached || await (async () => {
    const price = (await alpaca.getLatestQuote(symbol)).AskPrice

    if (asset.active && (price === 0 || price == null)) {
      const ohlc = await Price.findOne({
        symbol,
        timestamp: { $lte: DateTime.now() }
      }).sort('-timestamp')

      return ohlc.close
    }

    return price
  })()

  if (cached == null) {
    await redis.set(key, quote, {
      EX: 830
    })
  }

  return quote
}

async function fetchQuotes (symbols) {
  const cached = new Map(
    await symbols.reduce(
      async (prev, symbol) => {
        const cache = await redis.get(`${symbol}/quotes/latest`)
        if (cache) (await prev).push([symbol, cache])

        return prev
      }, [])
  )

  const misses = symbols.filter((symbol) => !cached.has(symbol))
  const fetched = new Map([...(await alpaca.getLatestQuotes(misses))].map(([symbol, val]) => [symbol, val.AskPrice]))

  const quotes = (await [...cached, ...fetched].reduce(async (prev, [symbol, quote]) => {
    const entries = await prev

    if (quote === 0 || quote === null) {
      const asset = await this.findOne({ symbol })

      if (asset === null) return entries

      const ohlc = await Price.findOne({
        symbol,
        timestamp: { $lte: DateTime.now() }
      }).sort('-timestamp')

      entries.push([symbol, asset.active ? ohlc.close : 0])
    } else {
      await redis.set(`${symbol}/quotes/latest`, quote, {
        EX: 830
      })

      entries.push([symbol, quote])
    }

    return entries
  }, []))

  return Object.fromEntries(new Map(quotes))
}

assetSchema.static('search', search)
assetSchema.static('fetchQuote', fetchQuote)
assetSchema.static('fetchQuotes', fetchQuotes)
assetSchema.static('topGainers', topGainers)

module.exports = model('Asset', assetSchema)
