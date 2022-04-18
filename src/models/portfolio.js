const { DateTime, Duration } = require('luxon')
const Big = require('big.js')

const { Schema, model } = require('mongoose')
const Asset = require('./asset')
const Order = require('./order')

const portfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  assets: { type: Map, of: Number, default: new Map(), required: true },
  cash: { type: Number, required: true, default: 1000, min: 0 }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

async function buy (symbol, q, n) {
  if ((q != null && n != null) || (q == null && n == null)) return false

  const price = await Asset.fetchPrice(symbol)
  const qty = q ? Big(q).round(6) : Big(n).div(price).round(6)
  const notional = n ? Big(n).round(2) : qty.times(price).round(2)

  const quantity = this.assets.get(symbol) || 0

  if (Big(this.cash).gte(notional) && notional.gte(1)) {
    this.assets.set(symbol, qty.plus(quantity).toFixed(6))
    this.cash = Big(this.cash).minus(notional).toFixed(2)
    await this.save()

    const order = new Order({ portfolio: this, symbol, qty, notional, side: 'buy' })
    await order.save()

    return true
  }

  return false
}

async function sell (symbol, q, n) {
  if ((q != null && n != null) || (q == null && n == null)) return false

  const price = await Asset.fetchPrice(symbol)
  const qty = q ? Big(q).round(6) : Big(n).div(price).round(6)
  const notional = n ? Big(n).round(2) : qty.times(price).round(2)

  const quantity = this.assets.get(symbol) || 0

  if (notional.gte(0.01) && qty.lte(quantity)) {
    if (qty.eq(quantity)) {
      this.assets.delete(symbol)
    } else {
      this.assets.set(symbol, Big(quantity).minus(qty).toFixed(6))
    }

    this.cash = notional.plus(this.cash).toFixed(2)
    await this.save()

    const order = new Order({ portfolio: this, symbol, qty, notional, side: 'sell' })
    await order.save()

    return true
  }

  return false
}

async function getValue () {
  const value = await [...this.assets.entries()].reduce(async (p, c) => {
    const prev = await p
    const [symbol, qty] = c

    const price = await Asset.fetchPrice(symbol)

    return Big(price).times(qty).plus(prev)
  }, Big(0))

  return value.plus(this.cash).round(2)
}

async function getHistory (opts) {
  const options = { ...{ date: DateTime.now(), duration: { weeks: 2 } }, ...opts }

  const step = (() => {
    const duration = options.duration

    switch (true) {
      case duration.weeks != null:
        return Duration.fromDurationLike({ days: 1 })
      case duration.months != null:
        return Duration.fromDurationLike({ weeks: 1 })
      case duration.years != null:
        return Duration.fromDurationLike({ months: 1 })
    }
  })()

  let head = false
  let date = (new DateTime(options.date)).endOf('day')
  const endDate = date.minus(Duration.fromDurationLike(options.duration))

  const res = [
    {
      timestamp: date,
      value: (await this.getValue()).minus(this.cash).round(2)
    }
  ]

  for (; date > endDate; date = date.minus(step)) {
    const closeDate = date.minus(step)

    if (head) {
      res.push({
        timestamp: closeDate,
        value: Big(0)
      })

      continue
    }

    const orders = await Order.find({ date: { $gte: date.endOf('day').minus(step), $lte: date.endOf('day') } }).sort('-date')

    const snapshot = await orders.reduce(async (prev, cur) => {
      const mult = cur.side === 'buy' ? 1 : -1
      const diff = Big(cur.notional).times(cur.qty).times(mult)
      head = head || cur.prev == null

      return (await prev).plus(diff).round(2)
    }, Big(0))

    if (head) continue

    res.push({
      timestamp: closeDate,
      value: res.at(-1).value.minus(snapshot)
    })
  }

  return res.reverse()
}

portfolioSchema.method('buy', buy)
portfolioSchema.method('sell', sell)
portfolioSchema.method('getValue', getValue)
portfolioSchema.method('getHistory', getHistory)

module.exports = model('Portfolio', portfolioSchema)
