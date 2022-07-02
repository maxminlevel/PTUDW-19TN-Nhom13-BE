const {StatusCodes} = require('http-status-codes')
const ProductDao = require('@/daos/product.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await ProductDao.findAll(ctx)
  return results
}
const getProduct = async (ctx, id) => {
  const results = await ProductDao.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({product: 'Not found'}).withCodes(
      AssetErrorCodes.PRODUCT_ID_INVALID
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
    await ProductDao.insertOne(ctx, {
        Name: body.name,
        Images: body.images,
        Price: body.price,
      }
    )
}
const update = async (ctx, productId, body) => {
  const result = await ProductDao.updateOne(ctx, productId, body)
  return result
}
const remove = async (ctx, productId, body) => {
  const result = await ProductDao.deleteOne(ctx, productId, body)
  return result
}

module.exports = {
  list,
  getProduct,
  create,
  update,
  remove,
}
