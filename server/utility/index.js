
const getUserData = (user) => {
  const userData = {
    id: user.uid,
    name: user.displayName,
    photo: user.photoURL,
    email: user.email
  }
  return userData
}

module.exports = {getUserData}
