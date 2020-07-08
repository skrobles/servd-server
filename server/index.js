const Koa = require('koa')
const morgan = require('koa-morgan')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const mount = require('koa-mount')
const path = require('path')
const koaBody = require('koa-body')
const session = require('koa-session')
const cors = require('@koa/cors')
const PORT = process.env.PORT || 8080
const {getRecipes} = require('./spoonAPI')
const firebase = require("firebase/app")
require("firebase/auth")
const {firebaseConfig, keys} = require('../secrets')
firebase.initializeApp(firebaseConfig)

module.exports = {app, firebase}

//Middleware

// setup the logger
app.use(morgan('dev'))

//set up body parser
app.use(koaBody())

//enable CORS
app.use(cors())

//session middleware
app.keys = keys
app.use(session(app))

//error handling middleware
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

// API routes
require('./routes')(router)
app.use(mount('/api', router.routes()))

//static middleware
// app.use(require('koa-static')(path.join(__dirname, '..', 'build')))


//start listening to requests
app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
