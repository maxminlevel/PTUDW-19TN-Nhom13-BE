const {StatusCodes} = require('http-status-codes')
const ReceiptDetailDao = require('@/daos/receiptdetail.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await ReceiptDetailDao.findAll(ctx)
  return results
}
const getReceiptDetail = async (ctx, id) => {
  const results = await ReceiptDetailDao.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({receiptdetail: 'Not found'}).withCodes(
      AssetErrorCodes.RECEIPT_DETAIL_ID_INVALID
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
    await ReceiptDetailDao.insertOne(ctx, {
        Name: body.name,
        LimitByProd: body.limitbyprod,
        LimitByTime: body.limitbytime,
        TimeLimit: body.timelimit,
        ReceiptDetailId: body.receiptdetailid,
      }
    )
}
const update = async (ctx, receiptdetailId, body) => {
  const result = await ReceiptDetailDao.updateOne(ctx, receiptdetailId, body)
  return result
}
const remove = async (ctx, receiptdetailId, body) => {
  const result = await ReceiptDetailDao.deleteOne(ctx, receiptdetailId, body)
  return result
}

module.exports = {
  list,
  getReceiptDetail,
  create,
  update,
  remove,
}
