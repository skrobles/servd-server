const admin = require('firebase-admin')
const serviceAccount = require('../../firestoreCred.json')
// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// })
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();

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

const parseRecipe = (recipe) => {
  const recipeKeys = ["title", "imgUrl", "ingredients", "steps", "sourceUrl", "servings", "time"]
  for (let key of recipeKeys) {
    if (!Object.keys(recipe).includes(key)) return 0;
  }
  return recipe;
}


const saveRecipe = async (recipe, userId) => {
  try {
    if (!parseRecipe(recipe)) return 0
    const addedRecipe = await db.collection(userId).doc(recipe.title).set(recipe)
    console.log(addedRecipe)
  } catch(err) {
    console.log(err)
    return(err)
  }
}

module.exports = {db, saveRecipe}
