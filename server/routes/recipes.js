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
    ctx.throw(500, 'Could not get recipes')
    next(err)
  }
})

//save a recipe to a user account
router.post('/', async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(400, 'User not logged in')
  else try {
    const userId = ctx.session.user.uid
    const recipe = await saveRecipe(ctx.request.body, userId)
    if (!recipe) ctx.throw(Error)
    ctx.status = 201
  } catch(err) {
    ctx.throw(400, 'Could not add recipe')
  }
})


// db.collection("cities").doc("LA").set({
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // })
  // .then(function() {
  //   console.log("Document successfully written!");
  // })
  // .catch(function(error) {
  //   console.error("Error writing document: ", error);
  // });
