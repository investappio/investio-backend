const { Schema, model } = require('mongoose')

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

async function getLeaders (n) {
  return this.find({}).sort('-value').limit(n)
}

leaderboardSchema.static('getLeaders', getLeaders)

module.exports = model('Leaderboard', leaderboardSchema, 'leaderboard')
