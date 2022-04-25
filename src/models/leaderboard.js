const { Schema, model } = require('mongoose')
const { filterUndefined } = require('../utils')

const leaderboardSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  value: { type: Number },
  user: {
    _id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    name: { type: String },
    username: { type: String }
  }
})

async function getLeaders (opts) {
  filterUndefined(opts)
  const options = { ...{ start: 0, count: 25 }, ...opts }
  return this.find({}).sort('-value').skip(options.start).limit(options.count)
}

leaderboardSchema.static('getLeaders', getLeaders)

module.exports = model('Leaderboard', leaderboardSchema, 'leaderboard')
