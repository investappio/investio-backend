const { Schema, model } = require('mongoose')
const Order = model('Order')

const Big = require('big.js')

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } }

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
  cash: { type: Number, required: true, default: 1000, min: 0 }
}, opts)

async function buy (stock, qty) {
  const price = await stock.price.close
  const quantity = Big(qty).round(6)
  const value = quantity.times(price).round(2)

  const asset = this.assets.get(stock.symbol) || {}

  if (Big(this.cash).gt(value) && value.gt(1)) {
    this.assets.set(stock.symbol, { stock, quantity: quantity.plus(asset.quantity || 0).toFixed(6) })
    this.cash = Big(this.cash).minus(value).toFixed(2)
    await this.save()

    const order = new Order({ portfolio: this, stock: stock, quantity: quantity.toFixed(6) })
    await order.save()

    return true
  }

  return false
}

async function sell (stock, qty) {
  const price = await stock.price.close
  const quantity = Big(qty).round(6)
  const value = quantity.times(price).round(2)

  const asset = this.assets.get(stock.symbol)

  if (value.gte(0.01) && asset && quantity.lte(asset.quantity)) {
    if (quantity.eq(asset.quantity)) {
      this.assets.delete(stock.symbol)
    } else {
      this.assets.set(stock.symbol, { stock, quantity: Big(asset.quantity).minus(quantity).toFixed(6) })
    }

    this.cash = value.plus(this.cash).toFixed(2)
    await this.save()

    const order = new Order({ portfolio: this, stock: stock, quantity: quantity.times(-1).toFixed(6) })
    await order.save()

    return true
  }

  return false
}

portfolioSchema.method('buy', buy)
portfolioSchema.method('sell', sell)

portfolioSchema.virtual('value').get(function () {
  const stocks = [...this.assets.keys()].reduce((prev, cur) =>
    Big(this.assets.get(cur).quantity).times(this.assets.get(cur).stock.price.close).plus(prev), Big(0)
  )

  return stocks.plus(this.cash).toFixed(2)
})

async function autoPopulate (next) {
  this.populate('assets.$*.stock')
  this.populate('user')
  await next()
}

portfolioSchema.pre('findOne', autoPopulate)

module.exports = model('Portfolio', portfolioSchema)
