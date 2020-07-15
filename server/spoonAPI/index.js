const { spoonApiKey } = require("../../secrets");
const axios = require("axios");
const testData = require("../../scripts/example.json");

const getRecipes = async (ingredientQuery) => {
  const offset = Math.floor(Math.random() * 50)
  const ingredientList = ingredientQuery.ingredients.split(", ");
  const escapedIngredients = ingredientList.join("%2C ");
  const { data } = await axios({
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": spoonApiKey,
      useQueryString: true
    },
    params: {
      number: "5",
      includeIngredients: escapedIngredients,
      ranking: "1",
      addRecipeInformation: true,
      instructionsRequired: true,
      offset: offset
    }
  });
  // const data = testData
  let ingredients;
  let steps;
  const recipes = data.results.map((result) => {
    //get list of ingredients without duplicates
    ingredients = [];
    if (result.analyzedInstructions.length > 0) {
      result.analyzedInstructions[0].steps.map((step) =>
        step.ingredients.forEach((ingredient) => {
          if (!ingredients.includes(ingredient.name)) {
            ingredients.push(ingredient.name);
          }
        })
      );

      //get steps for recipe
      steps = result.analyzedInstructions[0].steps.map((step) => step.step);
    }

    //formulate our recipe object
    let recipe = {
      title: result.title,
      imgUrl: result.image,
      ingredients,
      steps,
      sourceUrl: result.sourceUrl,
      servings: result.servings,
      time: result.readyInMinutes
    };
    return recipe;
  });

  // return recipes
  return recipes;
};

//other params that might be useful
//type: main course
//query: burger
//cuisine: american
//intolerances
//excludeIngredients

module.exports = {
  getRecipes
};
