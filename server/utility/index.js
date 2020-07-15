
const getUserData = (user) => {
  const userData = {
    id: user.uid,
    name: user.displayName,
    photo: user.photoURL,
    email: user.email
  }
  return userData
}

const parseUserData = (ctxBody) => {
  const userData = {}
  if (ctxBody.email.length > 0) userData.email = ctxBody.email
  if (ctxBody.name.length > 0) userData.displayName = ctxBody.name
  if (ctxBody.password.length > 0) userData.password = ctxBody.name
  return userData
}

module.exports = {getUserData, parseUserData}
