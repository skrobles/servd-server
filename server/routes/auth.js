const Router = require('koa-router')
const router = new Router()
const {firebase} = require('../index')
const {getUserData} = require('../utility')

module.exports = router.routes()


router.post('/signup', async (ctx, next) => {
  try {
    const {email, password} = ctx.request.body
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    ctx.session.user = user.user
    ctx.body = getUserData(user.user)
  } catch (err) {
    console.log(err.code, err.message)
    ctx.throw(err.code, err.message)
    next(err)
  }
})

router.post('/signin', async (ctx, next) => {
  try {
    const {email, password} = ctx.request.body
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    ctx.session.user = user.user
    ctx.body = getUserData(user.user)
  } catch (err) {
    console.log(err.code, err.message)
    ctx.throw(err.code, err.message)
    next(err)
  }
})

router.post('/signout', async (ctx, next) => {
  try {
    const logout = await firebase.auth().signOut()
    ctx.session = null
    ctx.body = "logout success"
  } catch (err) {
    console.log(err.code, err.message)
    ctx.throw(err.code, err.message)
    next(err)
  }
})


router.get('/', (ctx, next) => {
  try {
    const user = ctx.session.user ? getUserData(ctx.session.user) : {}
    ctx.body = user
  } catch (err) {
    next(err)
  }
})
