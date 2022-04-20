const { Schema, model } = require('mongoose')

const portfolioHistorySchema = new Schema({
  portfolio: { type: Schema.Types.ObjectId, ref: 'Portfolio', index: true },
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  value: { type: Number },
  cash: { type: Number }
})

portfolioHistorySchema.index({ portfolio: 1, timestamp: 1 }, { unique: true })

module.exports = model('PortfolioHistory', portfolioHistorySchema, 'portfolio_history')
