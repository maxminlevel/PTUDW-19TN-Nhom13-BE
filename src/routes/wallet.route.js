var router = require('express').Router()
const WalletService = require('@/services/wallet.service')
const {authUser, authAdmin, authCustomer} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

// List all
router.get(
  '/',
  authCustomer,
  midleware.page.request,
  async (req, res, next) => {
    try {
      res.success(await WalletService.list(req.ctx, req.ctx.get('data')), {
        metadata: req.ctx.get('data.paging'),
      })
    } catch (e) {
      res.fail(400, error.detail, error.statusCode)
    }
    next()
  }
)

// Get detail
router.get('/:id', authCustomer, async (req, res, next) => {
  try {
    res.success(await WalletService.getUser(req.ctx, {id: req.params.id}))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Add new
router.post('/', authCustomer, async (req, res, next) => {
  try {
    res.success(await WalletService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Modify
router.put('/:id', authCustomer, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await WalletService.update(req.ctx, userId, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Soft delete
router.delete('/:id', authCustomer, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await WalletService.remove(req.ctx, userId))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
