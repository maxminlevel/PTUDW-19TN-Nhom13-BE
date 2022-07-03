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
const create = async (ctx, body) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(body.password, salt, async function (err, hash) {
      await PackProductDao.insertOne(ctx, {
        ProductId: body.productId,
        PackId: body.packId,
        Limit: body.limit,
      })
    })
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
}
