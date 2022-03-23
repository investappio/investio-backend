const { Schema, model } = require('mongoose')

const stockSchema = new Schema({
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
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  updated: {
    type: Date,
    required: true
  }
})

module.exports = model('Stock', stockSchema)
