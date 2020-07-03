const Router = require('koa-router')
const router = new Router()

module.exports = (router) => {
  // router.prefix('/v1')
  router.use('/recipes', require('./recipes'))
}
