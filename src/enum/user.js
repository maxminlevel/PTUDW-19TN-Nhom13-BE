var KeyMirror = require('keymirror')

const UserType = KeyMirror({
  CUSTOMER: null,
  ADMIN: null,
  MANAGER: null,
})

const UserStatus = KeyMirror({
  LOCK: null,
  UNLOCK: null,
})

module.exports = {UserType, UserStatus}
