const { Schema, model } = require('mongoose')

const assetSchema = new Schema({
  stock: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  }
})

const portfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  assets: { type: Map, of: assetSchema, default: new Map(), required: true },
  balance: { type: Number, required: true, default: 1000, min: 0 }
})

async function buy (stock, quantity) {
  const price = await stock.getClosePrice()
  const value = Number((quantity * price).toFixed(2))

  const asset = this.assets.get(stock.symbol) || {}

  if (this.balance > value && value > 1) {
    this.assets.set(stock.symbol, { stock, quantity: ((asset.quantity || 0) + quantity).toFixed(6) })
    this.balance = (this.balance - value).toFixed(2)
    await this.save()
    return true
  }

  return false
}

async function sell (stock, quantity) {
  const price = await stock.getClosePrice()
  const value = Number((quantity * price).toFixed(2))

  const asset = this.assets.get(stock.symbol)

  if (value > 0.01 && asset && asset.quantity >= quantity) {
    if (asset.quantity === quantity) {
      this.assets.delete(stock.symbol)
    } else {
      this.assets.set(stock.symbol, { stock, quantity: ((asset.quantity) - quantity).toFixed(6) })
    }

    this.balance = (this.balance + value).toFixed(2)
    await this.save()
    return true
  }

  return false
}

portfolioSchema.method('buy', buy)
portfolioSchema.method('sell', sell)

module.exports = model('Portfolio', portfolioSchema)
