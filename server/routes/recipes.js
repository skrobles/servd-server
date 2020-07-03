const Router = require('koa-router')
const router = new Router()
const {getRecipes} = require('../spoonAPI')

module.exports = router.routes()

router.get('/', async (ctx, next) => {
  const recipes = await getRecipes(ctx.query)
  console.log(recipes)
  ctx.body = recipes
})


// app.use(async (ctx) => {
//   console.log(ctx)
//   const recipes = await getRecipes(['lettuce', 'tomato', 'parmesan cheese'])
//   // console.log(recipes)
//   ctx.body = ctx
// })
