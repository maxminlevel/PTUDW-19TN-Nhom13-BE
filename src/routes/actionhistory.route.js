var router = require('express').Router()
const ActionHistoryService = require('@/services/actionhistory.service')
const {authUser, authAdmin, authManager} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

// List all
router.get('/', authAdmin, midleware.page.request, async (req, res, next) => {
  try {
    res.success(await ActionHistoryService.list(req.ctx, req.ctx.get('data')), {
      metadata: req.ctx.get('data.paging'),
    })
  } catch (e) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Get detail
router.get('/:id', authAdmin, async (req, res, next) => {
  try {
    res.success(
      await ActionHistoryService.getUser(req.ctx, {id: req.params.id})
    )
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Add new
router.post('/', authAdmin, async (req, res, next) => {
  try {
    res.success(await ActionHistoryService.create(req.ctx, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Modify
router.put('/:id', authUser, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await ActionHistoryService.update(req.ctx, userId, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Soft delete
router.delete('/:id', authAdmin, async (req, res, next) => {
  try {
    const userId = req.params.id
    res.success(await ActionHistoryService.remove(req.ctx, userId))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
