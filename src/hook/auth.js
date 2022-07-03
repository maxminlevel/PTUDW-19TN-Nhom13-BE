const UserService = require('@/services/user.service')
const jwt = require('jsonwebtoken')

const {assignObjOnce} = require('@/helpers/object')
const {UserType} = require('@/enum/user')
const {AssetErrorCodes} = require('@/enum/error-codes')
const {ClientError} = require('@/helpers/error')
const _ = require('lodash')

const authUser = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    const decoded = await verify(authToken, req.ctx.config.JWT_CODE)
    const user = await UserService.getUser(req.ctx, {id: decoded.id})
    if (_.isEmpty(user)) {
      throw new ClientError({users: 'Not found'}).withCodes(
        AssetErrorCodes.USER_NOT_FOUND
      )
    }
    req.ctx.mergeData({user})
    next()
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
}

const authCustomer = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    const decoded = await verify(authToken, req.ctx.config.JWT_CODE)
    const user = await UserService.getUser(req.ctx, {id: decoded.id})
    if (user.Type != UserType.CUSTOMER) {
      throw new ClientError({users: 'Not customer'}).withCodes(
        AssetErrorCodes.PERMISSION_ADMIN_INVALID
      )
    }
    req.ctx.mergeData({user})
    next()
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
}

const verify = async (token, secrets, options) => {
  try {
    var decoded = jwt.verify(token, secrets, options)
    return decoded
  } catch (error) {
    throw new ClientError({token: 'Verify failed'}).withCodes(
      AssetErrorCodes.TOKEN_VERIFY_FAILED
    )
  }
}

const authAdmin = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    const decoded = await verify(authToken, req.ctx.config.JWT_CODE)
    console.log(decoded)
    const user = await UserService.getUser(req.ctx, {id: decoded.id})
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
  try {
    const authToken = req.headers.authorization
    const decoded = await verify(authToken, req.ctx.config.JWT_CODE)
    const user = await UserService.getUser(req.ctx, {id: decoded.id})
    if (user.Type != UserType.MANAGER && user.Type != UserType.ADMIN) {
      throw new ClientError({users: 'Not Manager'}).withCodes(
        AssetErrorCodes.PERMISSION_MANAGER_INVALID
      )
    }
    req.ctx.mergeData({user})
    next()
  } catch (error) {
    res.fail(400, error.detail, error.statusCode)
  }
}

module.exports = {authUser, authAdmin, authManager, authCustomer, verify}
