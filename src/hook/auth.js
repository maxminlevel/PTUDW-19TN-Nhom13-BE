const UserService = require('@/services/user.service')
const jwt = require('jsonwebtoken')

const {assignObjOnce} = require('@/helpers/object')
const {UserType} = require('@/enum/user')
const {AssetErrorCodes} = require('@/enum/error-codes')
const {ClientError} = require('@/helpers/error')

const authUser = async (req, res, next) => {
  const authToken = req.headers.authorization
  var decoded = jwt.verify(authToken, req.ctx.config.JWT_CODE)

  const user = await UserService.getUser(req.ctx, decoded.id)
  req.ctx.mergeData({user})
  next()
}

const authAdmin = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    var decoded = jwt.verify(authToken, req.ctx.config.JWT_CODE)
    const user = await UserService.getUser(req.ctx, decoded.id)
    if (user.Type != UserType.ADMIN) {
      throw new ClientError({users: 'Not admin'}).withCodes(
        AssetErrorCodes.PERMISSION_ADMIN_INVALID
      )
    }
    req.ctx.mergeData({user})
    next()
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
}

const authManager = async (req, res, next) => {
  const authToken = req.headers.authorization
  var decoded = jwt.verify(authToken, req.ctx.config.JWT_CODE)

  const user = await UserService.getUser(req.ctx, decoded.id)
  req.ctx.mergeData({user})
  next()
}

module.exports = {authUser, authAdmin, authManager}
