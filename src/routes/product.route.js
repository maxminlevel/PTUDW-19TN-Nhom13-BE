var router = require('express').Router()
const ProductService = require('@/services/product.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', authAdmin, midleware.page.request, async (req, res, next) => {
  try {
    res.success(await ProductService.list(req.ctx), {
      metadata: req.ctx.get('data.paging'),
    })
  } catch (e) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.get('/:id', authUser, async (req, res, next) => {
  try {
    const id = req.params.id
    res.success(await ProductService.getProduct(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.post('/', authAdmin, async (req, res, next) => {
  try {
    res.success(await ProductService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.put('/:id', authUser, async (req, res, next) => {
  try {
    const id = req.params.id
    res.success(await ProductService.update(req.ctx, id, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.delete('/:id', authAdmin, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await ProductService.remove(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
