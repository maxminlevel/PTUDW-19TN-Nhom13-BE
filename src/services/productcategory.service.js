const {StatusCodes} = require('http-status-codes')
const ProductCategoryDao = require('@/daos/productcategory.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await ProductCategoryDao.findAll(ctx)
  return results
}
const getProductCategory = async (ctx, id) => {
  const results = await ProductCategoryDao.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({productcategory: 'Not found'}).withCodes(
      AssetErrorCodes.PRODUCTCATEGORY_ID_INVALID
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
    await ProductCategoryDao.insertOne(ctx, {
        Name: body.name,
      }
    )
}
const update = async (ctx, prooductcategoryId, body) => {
  const result = await ProductCategoryDao.updateOne(ctx, prooductcategoryId, body)
  return result
}
const remove = async (ctx, prooductcategoryId, body) => {
  const result = await ProductCategoryDao.deleteOne(ctx, prooductcategoryId, body)
  return result
}

module.exports = {
  list,
  getProductCategory,
  create,
  update,
  remove,
}
