const { Schema, model } = require('mongoose')

const priceSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  open: {
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
  close: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  average: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    required: true
  }
})

module.exports = model('Price', priceSchema)
