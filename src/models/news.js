const { Schema, model } = require('mongoose')
const { filterUndefined } = require('../utils')

const newsSchema = new Schema({
  id: { type: Number, unique: true, required: true },
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

async function getPrevKey (opts) {
  filterUndefined(opts)
  const options = { ...{ start: null, count: 25 }, ...opts }
  const prev = await this.find(options.start ? { timestamp: { $gt: options.start } } : {}, { timestamp: 1 }).sort('+id').skip(options.count).limit(1)
  return prev[0] ? prev[0].timestamp : null
}

async function getNews (opts) {
  filterUndefined(opts)
  const options = { ...{ start: null, count: 25 }, ...opts }
  return this.find(options.start ? { timestamp: { $lt: options.start } } : {}).sort('-timestamp').limit(options.count)
}

newsSchema.static('getNews', getNews)
newsSchema.static('getPrevKey', getPrevKey)

module.exports = model('News', newsSchema)
