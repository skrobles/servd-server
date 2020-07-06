const Router = require('koa-router')
const router = new Router()
const firebase = require("firebase/app")
require("firebase/auth")
const {firebaseConfig} = require('../../secrets')
const { getNodeText } = require('@testing-library/react')
// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// })
firebase.initializeApp(firebaseConfig)



module.exports = router.routes()

router.get('/', ctx => {
  ctx.body = 'hello'
})

router.post('/signup', async (ctx, next) => {
  try {
    console.log(ctx.request.body)
    const {email, password} = ctx.request.body
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log(error)
      next(error)
    });
    ctx.body = ctx
  } catch (err) {
    next(err)
  }
})

