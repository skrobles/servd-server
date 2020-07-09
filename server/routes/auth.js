const Router = require("koa-router");
const router = new Router();
const { firebase } = require("../index");
const { getUserData } = require("../utility");

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
    ctx.session.user = user;
    ctx.body = getUserData(user);
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
    next(err);
  }
});

router.post("/signin", async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await firebase_auth_wrap(
      firebase.auth().signInWithEmailAndPassword(email, password)
    );
    ctx.session.user = user;
    ctx.body = getUserData(user);
  } catch (err) {
    console.log(err.code, err.message);
    ctx.throw(err.code, err.message);
    next(err);
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
    next(err);
  }
})

router.get('/', (ctx, next) => {
  try {
    const user = ctx.session.user ? getUserData(ctx.session.user) : {WORK:'HELLOOO'}
    // console.log('get route>>>>>', ctx.session)
    console.log('>>>>>*******req', ctx.request)
    console.log('>>>>>*******sess', ctx.session)
    ctx.body = user
  } catch (err) {
    next(err)
  }
})

