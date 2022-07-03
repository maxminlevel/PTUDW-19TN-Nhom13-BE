const {StatusCodes} = require('http-status-codes')
const {ClientError} = require('@/helpers/error')
const {AssetErrorCodes} = require('@/enum/error-codes')

const CureHistoryDao = require('@/daos/curehistory.dao')
const PackDao = require('@/daos/pack.dao')
const ProductDao = require('@/daos/product.dao')
const ReceiptDao = require('@/daos/receipt.dao')

const countPeopleByTimeState = async (ctx, startTime, stopTime, states) => {
    const results = await CureHistoryDao.findByTimeState(ctx, startTime, stopTime, states)
    return results
}

const countPeopleChangeState = async (ctx, startTime, stopTime, states) => {
    const results = await CureHistoryDao.findByTimeChangeState(ctx, startTime, stopTime, states)
    return results
}

const countPackUsedByTimeState = async (ctx, packId, startTime, stopTime) => {
    const results = await PackDao.findUsedByTime(ctx, packId, startTime, stopTime)
    return results
}

const countProductUsedByTimeState = async (ctx, productId, startTime, stopTime) => {
    const results = await ProductDao.findUsedByTime(ctx, productId, startTime, stopTime)
    return results
}

const sumPaymentByTime = async (ctx, startTime, stopTime) => {
    const results = await ReceiptDao.sumPaymentByTime(ctx, startTime, stopTime)
    return results
}

module.exports = {
  countPeopleByTimeState,
  countPeopleChangeState,
  countPackUsedByTimeState,
  countProductUsedByTimeState,
  sumPaymentByTime
}
