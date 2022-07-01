var KeyMirror = require('keymirror')

const UserType = KeyMirror({
  CUSTOMER: null,
  ADMIN: null,
  MANAGER: null,
})

module.exports = {UserType}
