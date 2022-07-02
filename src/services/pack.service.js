const {StatusCodes} = require('http-status-codes')
const PackDao = require('@/daos/pack.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await PackDao.findAll(ctx)
  return results
}
const getPack = async (ctx, id) => {
  const results = await PackDao.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({pack: 'Not found'}).withCodes(
      AssetErrorCodes.PACK_ID_INVALID
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
    await PackDao.insertOne(ctx, {
        Name: body.name,
        LimitByProd: body.limitbyprod,
        LimitByTime: body.limitbytime,
        TimeLimit: body.timelimit,
        ReceiptDetailId: body.receiptdetailid,
      }
    )
}
const update = async (ctx, packId, body) => {
  const result = await PackDao.updateOne(ctx, packId, body)
  return result
}
const remove = async (ctx, packId, body) => {
  const result = await PackDao.deleteOne(ctx, packId, body)
  return result
}

module.exports = {
  list,
  getPack,
  create,
  update,
  remove,
}
