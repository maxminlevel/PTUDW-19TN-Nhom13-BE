const {StatusCodes} = require('http-status-codes')
const LocationDAO = require('@/daos/location.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')
const _ = require('lodash')

const list = async (ctx, body) => {
  const {paging} = body
  paging.offset = _.max([paging.limit * (paging.page - 1), 0])
  let attributes = ['id', 'Name', 'Address', 'LoadSize', 'Status']
  const results = await LocationDAO.findAll(ctx, {
    offset: paging.offset,
    limit: paging.limit,
    attributes,
  })
  paging.found = results.length
  paging.pages = parseInt(
    ((await LocationDAO.countAll(ctx)) + paging.limit - 1) / paging.limit
  )
  return results
}
const get = async (ctx, body) => {
  const result = await LocationDAO.findOne(ctx, {
    where: {id: body.id},
    attributes: ['id', 'Name', 'Address', 'LoadSize', 'Status'],
  })
  if (!result) {
    throw new ClientError('Error').withCodes(
      AssetErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
  return result
}
const create = async (ctx, body) => {
  const result = await LocationDAO.insertOne(ctx, body)
  if (result) {
    throw new ClientError('Error').withCodes(
      AssetErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
  return result
}

const update = async (ctx, id, data) => {
  const result = await LocationDAO.updateOne(ctx, {
    where: {id: id},
    data,
  })
  return result
}

const remove = async (ctx, id) => {
  const result = await LocationDAO.deleteOne(ctx, {where: {id: id}})
  return result
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
}
