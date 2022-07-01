// const UserService = require('../services/user')

const auth = (req, res, next) => {
  console.log('MML')
  next()
}

module.exports = {auth}
