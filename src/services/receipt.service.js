const {StatusCodes} = require('http-status-codes')
const ReceiptDao = require('@/daos/receipt.dao')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const list = async (ctx) => {
  const results = await ReceiptDao.findAll(ctx)
  return results
}
const getReceipt = async (ctx, id) => {
  const results = await ReceiptDao.findOne(ctx, id)
  if (results.length != 1) {
    throw new ClientError({receipt: 'Not found'}).withCodes(
      AssetErrorCodes.RECEIPT_ID_INVALID
    )
  }
  return results[0]
}

const getReceiptByUser = async (ctx, uid) => {
  const results = await ReceiptDao.findByUserId(ctx, uid)
  if (results.length != 1) {
    throw new ClientError({receipt: 'Not found'}).withCodes(
      AssetErrorCodes.RECEIPT_ID_INVALID
    )
  }
  return results[0]
}
const create = async (ctx, body) => {
    await ReceiptDao.insertOne(ctx, {
        Time: body.time,
        Status: body.status,
        UserId: body.userid,
        PriceTotal: body.pricetotal,
      }
    )
}
const update = async (ctx, receiptId, body) => {
  const result = await ReceiptDao.updateOne(ctx, receiptId, body)
  return result
}
const remove = async (ctx, receiptId, body) => {
  const result = await ReceiptDao.deleteOne(ctx, receiptId, body)
  return result
}

module.exports = {
  list,
  getReceipt,
  create,
  update,
  remove,
  getReceiptByUser,
}
