const Router = require('koa-router')
const router = new Router()
const {getRecipes} = require('../spoonAPI')

module.exports = router.routes()

router.get('/', async (ctx, next) => {
  try {
    const recipes = await getRecipes(ctx.query)
    console.log(recipes)
    ctx.body = recipes
  } catch (err) {
    next(err)
  }
})



