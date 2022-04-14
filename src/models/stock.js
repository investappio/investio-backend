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
  const price = await Prices.findOne({ symbol: this.symbol }, 'close')
  return price.close
}

stockSchema.method('getClosePrice', getClosePrice)

async function topGainers (limit = 5) {
  const symbols = await Prices.find({}, { symbol: 1, _id: 0 }).sort({ changePercent: -1 }).limit(limit)
  return symbols.map((v) => v.symbol)
}

async function search (query) {
  return this.find({ $or: [{ name: { $regex: query, $options: 'i' } }, { symbol: { $regex: query, $options: 'i' } }] })
}

stockSchema.static('topGainers', topGainers)

stockSchema.static('search', search)

module.exports = model('Stock', stockSchema)
