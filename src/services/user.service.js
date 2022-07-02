const {StatusCodes} = require('http-status-codes')
const UserDAO = require('@/daos/user.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {UserStatus} = require('@/enum/user')

const list = async (ctx, body) => {
  const {paging} = body
  paging.offset = _.max([paging.limit * (paging.page - 1), 0])
  let attributes = ['id', 'Username', 'Status', 'Type']
  const results = await UserDAO.findAll(ctx, {
    offset: paging.offset,
    limit: paging.limit,
    attributes,
  })
  paging.found = results.length
  paging.pages = parseInt(
    ((await UserDAO.countAll(ctx)) + paging.limit - 1) / paging.limit
  )
  return results
}
const getUser = async (ctx, body) => {
  const results = await UserDAO.findOne(ctx, {
    where: {id: body.id},
    limit: 1,
    attributes: ['id', 'Username', 'Status', 'Type'],
  })
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
      await UserDAO.insertOne(ctx, {
        data: {
          Username: body.username,
          Password: hash,
          Type: body.type,
        },
      })
    })
  })
}

const update = async (ctx, userId, data) => {
  const result = await UserDAO.updateOne(ctx, {
    where: {id: userId},
    data,
  })
  return result
}

const lock = async (ctx, userId) => {
  const result = await update(ctx, userId, {
    Status: UserStatus.LOCK,
  })
  return result
}

const unlock = async (ctx, userId) => {
  const result = await update(ctx, userId, {
    Status: UserStatus.UNLOCK,
  })
  return result
}

const remove = async (ctx, userId) => {
  const result = await UserDAO.deleteOne(ctx, {where: {id: userId}})
  return result
}

module.exports = {
  list,
  getUser,
  create,
  update,
  remove,
  lock,
  unlock,
}
