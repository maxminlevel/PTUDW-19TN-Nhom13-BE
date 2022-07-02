const {StatusCodes} = require('http-status-codes')
const ActionHistoryDAO = require('@/daos/actionhistory.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')
const _ = require('lodash')

const list = async (ctx, body) => {
  const {paging} = body
  paging.offset = _.max([paging.limit * (paging.page - 1), 0])
  let attributes = ['id']
  const results = await ActionHistoryDAO.findAll(ctx, {
    offset: paging.offset,
    limit: paging.limit,
    attributes,
  })
  paging.found = results.length
  paging.pages = parseInt(
    ((await ActionHistoryDAO.countAll(ctx)) + paging.limit - 1) / paging.limit
  )
  return results
}
const getUser = async (ctx, body) => {
  const result = await ActionHistoryDAO.findOne(ctx, {
    where: {id: body.id},
    attributes: ['id'],
  })
  if (!result) {
    throw new ClientError({users: 'Not found'}).withCodes(
      AssetErrorCodes.USER_NOT_FOUND
    )
  }
  return result
}
const create = async (ctx, body) => {
  const result = await ActionHistoryDAO.insertOne(ctx, body)
  if (result) {
    throw new ClientError('Error').withCodes(
      AssetErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
  return result
}

const update = async (ctx, id, data) => {
  const result = await ActionHistoryDAO.updateOne(ctx, {
    where: {id: id},
    data,
  })
  return result
}

const remove = async (ctx, id) => {
  const result = await ActionHistoryDAO.deleteOne(ctx, {where: {id: id}})
  return result
}

module.exports = {
  list,
  getUser,
  create,
  update,
  remove,
}
