const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const priceSchema = new Schema({
  close: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true,
    index: true
  },
  volume: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  updated: {
    type: Date,
    required: true,
    index: true
  }
})

async function get (symbol, opts) {
  const options = { ...{ date: DateTime.now(), duration: { days: 5 } }, ...opts }

  return this.find({ symbol, date: { $lte: options.date.endOf('day'), $gte: options.date.minus(options.duration) } }).sort('+date')
}

priceSchema.static('get', get)

module.exports = model('Price', priceSchema)
