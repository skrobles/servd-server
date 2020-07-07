const Router = require('koa-router')
const router = new Router()
// const firebase = require("firebase/app")
// require("firebase/auth")
// const {firebaseConfig} = require('../../secrets')
// firebase.initializeApp(firebaseConfig)
const {firebase} = require('../index')

module.exports = router.routes()

// router.get('/', (ctx, next) => {
//   console.log("in get route", ctx.session.user)
//   ctx.body = ctx.session.user
// })

router.post('/signup', async (ctx, next) => {
  try {
    const {email, password} = ctx.request.body
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    ctx.session.user = user
    ctx.body = user
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.log(error)
    next(err)
  }
})

router.post('/signin', async (ctx, next) => {
  try {
    const {email, password} = ctx.request.body
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    ctx.session.user = user
    ctx.body = "sign in success"
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.log(err)
    next(err)
  }
})

router.post('/signout', async (ctx, next) => {
  try {
    const logout = await firebase.auth().signOut()
    ctx.session = null
    ctx.body = "logout success"
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.log(err)
    next(err)
  }
})
