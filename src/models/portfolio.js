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

async function buy (stock, amount) {
  const price = await stock.getClosePrice()
  const value = Number((amount * price).toFixed(2))

  const asset = this.assets.get(stock.symbol) || {}

  if (this.balance > value && value > 1) {
    this.assets.set(stock.symbol, { stock, quantity: ((asset.quantity || 0) + amount).toFixed(6) })
    this.balance = (this.balance - value).toFixed(2)
    console.log(this)
    await this.save()
    return true
  }

  return false
}

async function sell (stock, amount) {
  const price = await stock.getClosePrice()
  const value = Number((amount * price).toFixed(2))

  const asset = this.assets.get(stock.symbol)

  if (value > 0.01 && asset) {
    this.assets.set(stock.symbol, { stock, quantity: ((asset.quantity) - amount).toFixed(6) })
    this.balance = (this.balance + value).toFixed(2)
    console.log(this)
    await this.save()
    return true
  }

  return false
}

portfolioSchema.method('buy', buy)
portfolioSchema.method('sell', sell)

module.exports = model('Portfolio', portfolioSchema)
