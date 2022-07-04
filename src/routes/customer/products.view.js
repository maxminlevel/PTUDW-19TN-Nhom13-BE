var router = require('express').Router()
const ProductService = require('@/services/product.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', async (req, res) => {
  // get data
  var products = await ProductService.list(req.ctx)
  console.log(products)

  res.render('customer/products', {
    products,
  })
})

module.exports = router
