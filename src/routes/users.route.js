var router = require('express').Router()
const UserService = require('@/services/user.service')
const {authUser, authAdmin} = require('@/hook/auth')
const midleware = require('@/hook/middleware')

// List all user in admin view
router.get('/', authAdmin, midleware.page.request, async (req, res, next) => {
  console.log('first')
  try {
    res.success(await UserService.list(req.ctx), {
      metadata: req.ctx.get('data.paging'),
    })
  } catch (e) {
    console.log(e)
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Get detail user in admin view
// Get detail in user profile
router.get('/:id', authUser, async (req, res, next) => {
  try {
    const id = req.params.id
    res.success(await UserService.getUser(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Add new user in admin view
router.post('/', authAdmin, async (req, res, next) => {
  try {
    res.success(await UserService.create(req.ctx, req.body))
  } catch (error) {
    console.log(error)
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Modify user in admin view
router.put('/:id', authUser, async (req, res, next) => {
  try {
    const id = req.params.id
    res.success(await UserService.update(req.ctx, id, req.body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Soft delete user
router.delete('/:id', authAdmin, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await UserService.remove(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Lock user with id
router.post('/lock:id', authAdmin, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    const body = req.body
    res.success(await UserService.update(req.ctx, id, body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

// Unlock user with id
router.post('/unlock:id', authAdmin, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    const body = req.body
    res.success(await UserService.update(req.ctx, id, body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
