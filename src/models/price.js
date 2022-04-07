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

async function search (symbol, date = DateTime.now().endOf('day'), days = 5) {
  return this.find({ symbol, date: { $lte: date, $gte: date.minus({ days }) } })
}

priceSchema.static('search', search)

module.exports = model('Price', priceSchema)
