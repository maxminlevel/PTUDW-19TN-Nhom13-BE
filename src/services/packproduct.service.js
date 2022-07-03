const {StatusCodes} = require('http-status-codes')
const PackProductDao = require('@/daos/packproduct.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await PackProductDao.findAll(ctx)
  return results
}
const getPackProduct = async (ctx, ProductId, PackId) => {
  const results = await PackProductDao.findOne(ctx, ProductId, PackId)
  if (results.length != 1) {
    throw new ClientError({packproduct: 'Not found'}).withCodes(
      AssetErrorCodes.PACKPRODUCT_IDS_INVALID
    )
  }
  return results[0]
}

const getPack = async (ctx, PackId) => {
  const results = await PackProductDao.findPack(ctx, PackId)
  if (results.length == 0) {
    throw new ClientError({packproduct: 'Not found'}).withCodes(
      AssetErrorCodes.PACKPRODUCT_IDS_INVALID
    )
  }
  return results[0]
}

const getProduct = async (ctx, ProductId) => {
  const results = await PackProductDao.findProduct(ctx, ProductId)
  if (results.length == 0) {
    throw new ClientError({packproduct: 'Not found'}).withCodes(
      AssetErrorCodes.PACKPRODUCT_IDS_INVALID
    )
  }
  return results[0]
}


const create = async (ctx, body) => {
  return await PackProductDao.insertOne(ctx, {
    ProductId: body.productid,
    PackId: body.packid,
    Limit: body.limit,
  })
}
const update = async (ctx, ProductId, PackId, body) => {
  const result = await PackProductDao.updateOne(ctx, ProductId, PackId, body)
  return result
}
const remove = async (ctx, ProductId, PackId, body) => {
  const result = await PackProductDao.deleteOne(ctx, ProductId, PackId, body)
  return result
}

module.exports = {
  list,
  getPackProduct,
  create,
  update,
  remove,
  getPack,
  getProduct,
}
