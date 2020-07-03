const admin = require('firebase-admin')
const serviceAccount = require('../../firestoreCred.json')
// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// })
admin.initializeApp({
  credential: admin.credentials.cert(serviceAccount)
})
const db = admin.firestore();

db.collection("cities").doc("LA").set({
  name: "Los Angeles",
  state: "CA",
  country: "USA"
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
