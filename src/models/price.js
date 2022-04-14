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

async function get (symbol, opts = { date: DateTime.now().endOf('day'), duration: { days: 5 } }) {
  const duration = opts.duration || { days: 5 }
  const date = opts.date || DateTime.now().endOf('day')

  return this.find({ symbol, date: { $lte: date, $gte: date.minus(duration) } })
}

priceSchema.static('get', get)

module.exports = model('Price', priceSchema)
