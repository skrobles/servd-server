const Router = require('koa-router')
const router = new Router()
const {getRecipes} = require('../spoonAPI')
const {db, saveRecipe} = require('../db')

module.exports = router.routes()

//search recipes by ingredients
router.get('/', async (ctx, next) => {
  const recipes = await getRecipes(ctx.query)
  console.log(recipes)
  ctx.body = recipes
})

//save a recipe to a user account
router.post('/', async (ctx, next) => {
  try {
    // const recipe = ctx.request.body
    const userId = ctx.session.user.uid
    const recipe = await saveRecipe(ctx.request.body, userId)
    console.log(recipe)
    // console.log("posted recipe", recipe)
    // console.log("user on session", ctx.session.user.uid)
    ctx.body = ctx.session.user.uid
  } catch(err) {
    next(err)
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
