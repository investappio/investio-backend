const { Schema, model } = require('mongoose')
const Price = model('Price')

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
  },
  price: { type: Schema.Types.ObjectId, ref: 'Price', required: true }
})

async function topGainers (limit = 5) {
  const symbols = (await Price.find({}, { symbol: 1, _id: 0 })
    .sort('-changePercent').limit(limit)
  ).map((v) => v.symbol)

  return this.find({ symbol: { $in: symbols } })
}

async function search (query) {
  return this.find({ $or: [{ name: { $regex: query, $options: 'i' } }, { symbol: { $regex: query, $options: 'i' } }] })
}

stockSchema.static('topGainers', topGainers)

stockSchema.static('search', search)

async function autoPopulate (next) {
  this.populate('price')
  await next()
}

stockSchema.pre('findOne', autoPopulate)
  .pre('find', autoPopulate)

module.exports = model('Stock', stockSchema)
