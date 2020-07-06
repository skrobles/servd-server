const Koa = require('koa')
const morgan = require('koa-morgan')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const mount = require('koa-mount')
const path = require('path')
const koaBody = require('koa-body');
const PORT = process.env.PORT || 8080
const {getRecipes} = require('./spoonAPI')

module.exports = app

//Middleware

// setup the logger
app.use(morgan('dev'))

//set up body parser
app.use(koaBody());

// API routes
require('./routes')(router)
app.use(mount('/api', router.routes()))

//static middleware
app.use(require('koa-static')(path.join(__dirname, '..', 'build')))


//start listening to requests
app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
