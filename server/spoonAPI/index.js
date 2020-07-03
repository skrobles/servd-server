const {spoonApiKey} = require('../../secrets')
const axios = require('axios')
const testData = require('../../scripts/example.json')


const getRecipes = async (ingredientList) => {
  const escapedIngredients = ingredientList.join('%2C ')
  // const {data} = await axios({
  //   "method":"GET",
  //   "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
  //   "headers":{
  //   "content-type":"application/octet-stream",
  //   "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //   "x-rapidapi-key": spoonApiKey,
  //   "useQueryString":true
  //   },"params":{
  //   "number":"2",
  //   "includeIngredients":"onions%2C lettuce%2C tomato",
  //   "ranking":"1",
  //   "addRecipeInformation": true
  //   }
  //   })
    const data = testData
    let ingredients
    const recipes = data.results.map(result => {
      //get list of ingredients without duplicates
      ingredients = []
      result.analyzedInstructions[0].steps.map(step => step.ingredients.forEach(ingredient => {
        if (!ingredients.includes(ingredient.name)) {
          ingredients.push(ingredient.name)
        }
      }))
      //get steps for recipe
      let steps = result.analyzedInstructions[0].steps.map(step => step.step)

      //formulate our recipe object
      let recipe = {
        title: result.title,
        imgUrl: result.image,
        ingredients,
        steps,
        sourceUrl: result.sourceUrl,
        servings: result.servings,
        time: result.readyInMinutes
      }
      return recipe
    })

    return recipes
}

//other params that might be useful
//type: main course
//query: burger
//cuisine: american
//intolerances
//excludeIngredients



module.exports = {
  getRecipes
}
