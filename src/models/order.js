const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } }

const orderSchema = new Schema({
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
  stock: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, index: true, default: DateTime.now(), required: true }
}, opts)

orderSchema.virtual('type').get(function () {
  return this.quantity > 0 ? 'BUY' : 'SELL'
})

async function autoPopulate (next) {
  this.populate('stock')
  await next()
}

orderSchema.pre('findOne', autoPopulate)
  .pre('find', autoPopulate)

module.exports = model('Order', orderSchema)
