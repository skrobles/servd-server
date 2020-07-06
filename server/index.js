const Koa = require('koa')
const morgan = require('koa-morgan')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const mount = require('koa-mount')
const path = require('path')
const PORT = process.env.PORT || 8080
const {getRecipes} = require('./spoonAPI')

module.exports = app

//Middleware

// setup the logger
app.use(morgan('dev'))

//static middleware


// API routes
require('./routes')(router)
// app.use(router.routes())
app.use(mount('/api', router.routes()))


app.use(require('koa-static')(path.join(__dirname, '..', 'build')))
// app.use(async (ctx) => {
//   console.log(ctx)
//   const recipes = await getRecipes(['lettuce', 'tomato', 'parmesan cheese'])
//   // console.log(recipes)
//   ctx.body = ctx
// })


//start listening to requests
app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
