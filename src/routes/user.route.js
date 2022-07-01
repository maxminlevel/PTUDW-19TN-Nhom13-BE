var router = require('express').Router()
const UserService = require('../services/user.service')
const auth = require('../hook/auth')
const {useInt} = require('../hook/id')

router.get('/', async (req, res, next) => {
  try {
    res.success(await UserService.list(req.ctx))
  } catch (e) {
    console.log(e)
  }
  next()
})
router.get('/:id', useInt, async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await UserService.detail(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.post('/', async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await UserService.detail(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    const body = req.body
    res.success(await UserService.update(req.ctx, id, body))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.ctx.get('data.id')
    res.success(await UserService.remove(req.ctx, id))
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
  next()
})

module.exports = router
