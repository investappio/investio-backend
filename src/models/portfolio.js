const { Schema, model } = require('mongoose')

const assetSchema = new Schema({
  stock: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
  quantity: {
    type: Number,
    min: 0,
    required: true
  }
})

const portfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  assets: [assetSchema],
  balance: { type: Number, required: true, default: 1000 }
})

async function buy (stock, amount) {
  const price = await stock.getClosePrice()
  await this.update({ 'assets.$.stock': stock }, { $inc: { quantity: amount * price } })
}

portfolioSchema.method('buy', buy)

module.exports = model('Portfolio', portfolioSchema)
