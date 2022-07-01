const {StatusCodes} = require('http-status-codes')
const UserDAO = require('../daos/user.dao')
const {ClientError} = require('../helpers/error')
const {AssetErrorCodes} = require('../enum/error-codes')

const list = async (ctx) => {
  const result = await UserDAO.list(ctx)
  return result
}
const detail = async (ctx, id) => {
  const result = await UserDAO.get(ctx, id)
  if (result.length != 1) {
    throw new ClientError('US', AssetErrorCodes.USER_ID_INVALID)
  }
  return result
}
const create = async (ctx, body) => {
  return {}
}
const update = async (ctx, userId, body) => {
  return {}
}
const remove = async (ctx, userId) => {
  return {}
}

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
}
