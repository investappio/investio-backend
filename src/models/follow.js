const { Schema, model } = require('mongoose')

const followSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  follower: { type: Schema.Types.ObjectId, ref: 'User', index: true }
})

followSchema.index({ user: 1, follower: 1 }, { unique: true })

module.exports = model('Follow', followSchema)
