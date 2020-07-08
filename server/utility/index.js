
const getUserData = (user) => {
  const userData = {
    id: user.user.uid,
    name: user.user.displayName,
    photo: user.user.photoURL,
    email: user.user.email
  }
  return userData
}

module.exports = {getUserData}
