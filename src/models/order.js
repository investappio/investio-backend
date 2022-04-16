const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } }

const orderSchema = new Schema({
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
  stock: { type: Schema.Types.ObjectId, ref: 'Stock' },
  quantity: { type: Number },
  snapshot: { type: Number, required: true },
  date: { type: Date, index: true, default: DateTime.now(), required: true },
  prev: { type: Schema.Types.ObjectId, ref: 'Order' },
  next: { type: Schema.Types.ObjectId, ref: 'Order' }
}, opts)

orderSchema.virtual('type').get(function () {
  return this.quantity > 0 ? 'BUY' : 'SELL'
})

async function listLink (next) {
  const prev = await this.constructor.findOne({
    next: null,
    portfolio: this.portfolio,
    date: { $lte: this.date },
    _id: { $ne: this }
  }).sort('+date')

  if (prev != null) {
    prev.next = this
    await prev.save()
  }

  if (this.next == null) {
    this.prev = prev
  }

  await next()
}

async function autoPopulate (next) {
  this.populate('stock')
  await next()
}

orderSchema
  .pre('findOne', autoPopulate)
  .pre('find', autoPopulate)
  .pre('save', listLink)

module.exports = model('Order', orderSchema)
