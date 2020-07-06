const Koa = require('koa')
const morgan = require('koa-morgan')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const mount = require('koa-mount')
const koaBody = require('koa-body')
const path = require('path')
const serve = require('koa-static')
const send = require('koa-send')
const render = require('koa-ejs')
const PORT = process.env.PORT || 8080


module.exports = app

//Middleware

// setup the logger
app.use(morgan('dev'))

//set up body parsing middleware
app.use(koaBody());

app.use((ctx, next) => {
  // console.log(ctx)
  console.log(path.join(__dirname, '..', 'public'))
  next()
})

render(app, {
  root: path.join(__dirname, '..', 'public'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
})

// API routes
require('./routes')(router)
app.use(mount('/api', router.routes()))

  // static file-serving middleware
// app.use(serve(path.join(__dirname, '..', 'public')))
// app.use(serve(__dirname + '/test/fixtures'));

// app.use(mount('*', async (ctx, next) => {
app.use(async (ctx, next) => {
  // res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  // serve(path.join(__dirname, '..', 'public/index.html'))
  // await send(ctx, ctx.path, { root: __dirname + '/public/index.html' });
  console.log('in render function')
  await ctx.render('index')
})


//start listening to requests
app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
