const Koa = require('koa')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const mongoose = require('mongoose')

const routes = require('./routes')
const { normalizePort } = require('./utils');

const app = new Koa()
const port = normalizePort(process.env.PORT || '3000');

app.use(logger())

app.use(koaBody({
  multipart: true,
}));

mongoose.connect(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`,
  {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

mongoose.connection.once('open', async () => {
  app.use(routes);
  app.listen(port);
})
