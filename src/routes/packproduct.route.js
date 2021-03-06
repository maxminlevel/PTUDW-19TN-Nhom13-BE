var router = require('express').Router()
const PackProductService = require('@/services/packproduct.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

router.get('/', authAdmin, midleware.page.request, async (req, res, next) => {
  try {
    res.success(await PackProductService.list(req.ctx), {
      metadata: req.ctx.get('data.paging'),
    })
  } catch (e) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.get('/:productId&:packId', authUser, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const packId = req.params.packId
    res.success(
      await PackProductService.getPackProduct(req.ctx, productId, packId)
    )
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

router.get('/:id', authUser, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const packId = req.params.packId
    const id = req.params.id
    if (typeof productId != 'undefined') {
      res.success(await PackProductService.getProduct(req.ctx, productId))
    }
    else {
      if (typeof packId != 'undefined') {
        res.success(await PackProductService.getPack(req.ctx, packId))
      }
      else {
        if (typeof id != 'undefined') {
          res.success(await PackProductService.getPack(req.ctx, id))
        }
        else {
          res.fail(400, 'Invalid request', 400)
        }
      }
    }
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

router.post('/', authAdmin, async (req, res, next) => {
  try {
    res.success(await PackProductService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.put('/:productId&:packId', authUser, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const packId = req.params.packId
    res.success(
      await PackProductService.update(req.ctx, productId, packId, req.body)
    )
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.delete('/:productId&:packId', authAdmin, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const packId = req.params.packId
    res.success(await PackProductService.remove(req.ctx, productId, packId))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
