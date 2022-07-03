var router = require('express').Router()
const LocationService = require('@/services/location.service')
const {authUser, authAdmin, authManager} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

// List all
router.get('/', authManager, midleware.page.request, async (req, res, next) => {
  try {
    res.success(await LocationService.list(req.ctx, req.ctx.get('data')), {
      metadata: req.ctx.get('data.paging'),
    })
  } catch (e) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Get detail
router.get('/:id', authManager, async (req, res, next) => {
  try {
    res.success(await LocationService.getUser(req.ctx, {id: req.params.id}))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Add new
router.post('/', authManager, async (req, res, next) => {
  try {
    res.success(await LocationService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Modify
router.put('/:id', authManager, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await LocationService.update(req.ctx, userId, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Soft delete
router.delete('/:id', authManager, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await LocationService.remove(req.ctx, userId))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
