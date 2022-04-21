const { Schema, model } = require('mongoose')

const newsSchema = new Schema({
  author: { type: String },
  timestamp: { type: Date, index: true, required: true },
  headline: { type: String, minlength: 1, required: true },
  summary: { type: String },
  content: { type: String },
  url: { type: String, required: true },
  symbols: { type: [{ type: String }], index: true },
  source: { type: String, required: true }
})

newsSchema.index(
  { headline: 'text', summary: 'text', content: 'text' },
  { weights: { headline: 10, summary: 2, content: 1 } }
)

module.exports = model('News', newsSchema)
