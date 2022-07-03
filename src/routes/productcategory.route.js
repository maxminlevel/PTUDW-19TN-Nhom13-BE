var router = require('express').Router()
const ProductCategoryService = require('@/services/productcategory.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', authAdmin, midleware.page.request, async (req, res, next) => {
  try {
    res.success(await ProductCategoryService.list(req.ctx), {
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
    res.success(await ProductCategoryService.getProductCategory(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.post('/', authAdmin, async (req, res, next) => {
  try {
    res.success(await ProductCategoryService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.put('/:id', authUser, async (req, res, next) => {
  try {
    const id = req.params.id
    res.success(await ProductCategoryService.update(req.ctx, id, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.delete('/:id', authAdmin, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await ProductCategoryService.remove(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
