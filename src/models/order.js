const { DateTime } = require('luxon')

const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true, index: true },
  symbol: { type: String, required: true },
  qty: { type: Number, required: true },
  notional: { type: Number, required: true },
  side: { type: String, enum: ['buy', 'sell'], required: true },
  timestamp: { type: Date, index: true, default: DateTime.now(), required: true },
  prev: { type: Schema.Types.ObjectId, ref: 'Order' },
  next: { type: Schema.Types.ObjectId, ref: 'Order' }
})

async function listLink (next) {
  const prev = await this.constructor.findOne({
    next: null,
    portfolio: this.portfolio,
    timestamp: { $lte: this.timestamp },
    _id: { $ne: this }
  }).sort('-_id')

  if (prev != null) {
    prev.next = this
    await prev.save()
  }

  if (this.next == null) {
    this.prev = prev
  }

  await next()
}

orderSchema.pre('save', listLink)

module.exports = model('Order', orderSchema)
