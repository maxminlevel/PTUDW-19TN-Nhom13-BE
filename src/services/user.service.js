const {StatusCodes} = require('http-status-codes')
const UserDAO = require('@/daos/user.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')
const bcrypt = require('bcrypt')

const list = async (ctx) => {
  const results = await UserDAO.findAll(ctx)
  return results
}
const getUser = async (ctx, id) => {
  const results = await UserDAO.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({users: 'Not found'}).withCodes(
      AssetErrorCodes.USER_NOT_FOUND
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(body.password, salt, async function (err, hash) {
      console.log(err, hash)
      await UserDAO.insertOne(ctx, {
        Username: body.username,
        Password: hash,
        Type: body.type,
      })
    })
  })
}
const update = async (ctx, userId, body) => {
  const result = await UserDAO.updateOne(ctx, userId, body)
  return result
}
const remove = async (ctx, userId, body) => {
  const result = await UserDAO.deleteOne(ctx, userId, body)
  return result
}

module.exports = {
  list,
  getUser,
  create,
  update,
  remove,
}
