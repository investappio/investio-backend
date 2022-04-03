const { Schema, model } = require('mongoose')
const Prices = model('Price')

const stockSchema = new Schema({
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
  type: {
    type: String,
    index: true
  }
})

async function getClosePrice () {
  return Prices.findOne({ symbol: this.symbol }).sort({ date: -1 }).populate('close')
}

stockSchema.method('getClosePrice', getClosePrice)

async function search (query) {
  return this.find({ $or: [{ name: { $regex: query, $options: 'i' } }, { symbol: { $regex: query, $options: 'i' } }] })
}

stockSchema.static('search', search)

module.exports = model('Stock', stockSchema)
