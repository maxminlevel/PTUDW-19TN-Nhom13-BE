var router = require('express').Router()
const UserService = require('@/services/user.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', async (req, res) => {
  // get data
  var users = await UserService.list(req.ctx, req.body)
  users.forEach((user) => {
    user['lock'] = user['Status'] == 'LOCK'
  })
  console.log(users)

  res.render('admin/users', {
    users,
  })
})

module.exports = router
