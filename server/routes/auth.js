const Router = require("koa-router");
const router = new Router();
const { firebase } = require("../index");
const {admin } = require('../db')
const { getUserData, parseUserData } = require("../utility");

module.exports = router.routes();

let firebase_auth_wrap = async (promise) => {
  let rejected = Symbol();
  let value_or_error = await promise.catch((error) => {
    return { [rejected]: true, error: error };
  });

  if (value_or_error[rejected]) {
    throw value_or_error.error;
  } else {
    return value_or_error;
  }
};

router.post("/signup", async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await firebase_auth_wrap(
      firebase.auth().createUserWithEmailAndPassword(email, password)
    );
    ctx.session.user = user.user;
    ctx.body = getUserData(user.user);
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
  }
});

router.post("/signin", async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await firebase_auth_wrap(
      firebase.auth().signInWithEmailAndPassword(email, password)
    );
    ctx.session.user = user.user;
    ctx.body = getUserData(user.user);
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
  }
});

router.post("/signout", async (ctx, next) => {
  try {
    const logout = await firebase.auth().signOut();
    ctx.session = null;
    ctx.body = "logout success";
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
  }
})

router.post('/google', async (ctx, next) => {
  try {
    const id_token = ctx.request.body.token
    const credential = await firebase.auth.GoogleAuthProvider.credential(id_token);
    const user = await firebase.auth().signInWithCredential(credential)
    ctx.session.user = user.user;
    ctx.body = getUserData(user.user);
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
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


router.put('/', async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, 'Not logged in')
  try {
    const updatedInfo = parseUserData(ctx.request.body)
    const user = await admin.auth().updateUser(ctx.session.user.uid, updatedInfo)
    ctx.session.user = user
    ctx.body = getUserData(user)
  } catch (err) {
    console.log(err)
    ctx.throw(err.status, err.message)
  }
})
