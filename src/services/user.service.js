const {StatusCodes} = require('http-status-codes')
const UserDAO = require('@/daos/user.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
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
  const result = await UserDAO.findOne(ctx, {
    where: {id: body.id},
    attributes: ['id', 'Username', 'Status', 'Type'],
  })
  if (!result) {
    throw new ClientError({users: 'Not found'}).withCodes(
      AssetErrorCodes.USER_NOT_FOUND
    )
  }
  return result
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

const sign = async (payload, secrets, options) => {
  return jwt.sign(payload, secrets, options)
}

const getAuthToken = async (ctx, body) => {
  const user = await UserDAO.findOne(ctx, {where: {Username: body.username}})
  if (_.isEmpty(user)) {
    throw new ClientError({users: 'Not found'}, AssetErrorCodes.USER_NOT_FOUND)
  }
  if (!bcrypt.compareSync(body.password, user.Password)) {
    throw new ClientError(
      {users: 'Login failed'},
      AssetErrorCodes.USER_NOT_FOUND
    )
  }
  const token = await sign(
    {
      id: user.id,
      ttl: ctx.config.JWT_EXPIRES,
    },
    ctx.config.JWT_CODE
  )
  return {token}
}

module.exports = {
  list,
  getUser,
  create,
  update,
  remove,
  lock,
  unlock,
  login: getAuthToken,
}
