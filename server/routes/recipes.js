const Router = require('koa-router')
const router = new Router()
const {getRecipes} = require('../spoonAPI')
const {db, saveRecipe} = require('../db')

module.exports = router.routes()

//search recipes by ingredients
router.get('/', async (ctx, next) => {
  try {
  const recipes = await getRecipes(ctx.query)
  console.log(recipes)
  ctx.body = recipes
  } catch (err) {
    console.log(err)
    ctx.throw(500, 'Could not get recipes')
  }
})

//save a recipe to a user account
router.post('/', async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, 'Must be logged in to save recipe')
  else try {
    const userId = ctx.session.user.uid
    const recipe = await saveRecipe(ctx.request.body, userId)
    if (!recipe) ctx.throw(Error)
    ctx.status = 201
  } catch(err) {
    console.log(err)
    ctx.throw(500, 'Could not add recipe')
  }
})

//get a users saved recipes
router.get('/saved', async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, 'Must be logged in for saved recipes')
  else try {
    const recipes = []
    await db.collection(ctx.session.user.uid).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          recipes.push(doc.data())
      });
    });
    ctx.body = recipes;
  } catch(err) {
    console.log(err)
    ctx.throw(500, 'Error getting saved recipes')
  }
})

//remove a recipe from a user's account
router.delete('/:title', async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, 'Must be logged in to remove a recipe')
  else try {
    await db.collection(ctx.session.user.uid).doc(ctx.params.title).delete()
    ctx.status = 200
  } catch (err) {
    console.log(err)
    ctx.throw(500, 'Error removing recipe')
  }
})
