var router = require('express').Router()
const PackService = require('@/services/pack.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', async (req, res) => {
  // get data
  var packs = await PackService.list(req.ctx)
  console.log(packs)

  res.render('customer/packs', {
    packs,
  })
})

module.exports = router
