const Koa = require('koa')
const morgan = require('koa-morgan')
const app = new Koa()
const PORT = process.env.PORT || 8080
const {getRecipes} = require('./spoonAPI')

//Middleware

// setup the logger
app.use(morgan('dev'))

app.use(async (ctx) => {
  // console.log(ctx)
  const recipes = await getRecipes(['lettuce', 'tomato', 'parmesan cheese'])
  console.log(recipes)
  ctx.body = recipes
})


//start listening to requests
app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
