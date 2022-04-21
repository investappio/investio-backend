const Koa = require('koa')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const sanitizeHtml = require('sanitize-html')

const mongoose = require('mongoose')

const routes = require('./routes')
const { News } = require('./models')
const { normalizePort, newsStream } = require('./utils')

const app = new Koa()
const port = normalizePort(process.env.PORT || '3000')

app.use(logger())

app.use(koaBody({
  multipart: true
}))

app.use(jwt({ secret: process.env.JWT_SECRET.split(','), passthrough: true }))

mongoose.connect(
  `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,
  {
    authSource: 'admin',
    auth: {
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD
    },
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
    autoIndex: true
  }
)

mongoose.connection.useDb('investio')

mongoose.connection.once('open', async () => {
  app.use(routes)
  app.listen(port)

  newsStream.on('authenticated', () => {
    newsStream.emit('subscribe', 'news', ['*'])
  })

  newsStream.on('news', async (data) => {
    const news = data.map((n) => {
      const { updated_at: _, created_at: createdAt, summary, content, headline, ...article } = n

      return new News({
        timestamp: createdAt,
        summary: sanitizeHtml(summary, { allowedTags: [], allowedAttributes: {} }).replace(/\s/g, ' ').trim(),
        content: sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} }).replace(/\s/g, ' ').trim(),
        headline: sanitizeHtml(headline, { allowedTags: [], allowedAttributes: {} }).replace(/\s/g, ' ').trim(),
        ...article
      })
    })

    await Promise.all(news.map(async (n) => {
      try {
        return await n.save()
      } catch (err) {
        return err
      }
    }))
  })
})
