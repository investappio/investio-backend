const { Schema, model } = require('mongoose')

const newsSchema = new Schema({
  author: { type: String },
  timestamp: { type: Date, index: true },
  headline: { type: String },
  summary: { type: String },
  content: { type: String },
  images: {
    size: { type: String },
    url: { type: String }
  },
  url: { type: String }
})

module.exports = model('News', newsSchema)
