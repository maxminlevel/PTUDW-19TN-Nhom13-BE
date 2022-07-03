const findAll = async (ctx) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  return await models.Receipt.findAll({
    raw: true,
    attributes: ['id', 'Time', 'Status', 'PriceTotal', 'UserId'],
  })
}

const sumPaymentByTime = async (ctx, timeStart, timeStop) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.findAll({
    where: { 
      [Op.and]: [
        {
          createdAt: {
            [Op.gte]: timeStart,
          },
          createdAt: {
            [Op.lte]: timeStop,
          },
        },
      ]
     },
    raw: true,
    attributes: ['PriceTotal'],
  })

  let sum = 0
  result.forEach(item => {
    sum += item.PriceTotal
  })
  return sum
}

const findByUserId = async (ctx, id) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.findAll({
    where: { 
      UserId: id 
    },
    raw: true,
    attributes: ['id', 'Time', 'Status', 'PriceTotal', 'UserId'],
  })
  return result
}

const findOne = async (ctx, id) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.findAll({
    where: { id },
    raw: true,
    limit: 1,
    attributes: ['id', 'Time', 'Status', 'PriceTotal', 'UserId'],
  })
  return result
}
const insertOne = async (ctx, data) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.create(data)
  return result
}
const updateOne = async (ctx, id, data) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.update(data, {
    where: {
      id,
    },
  })
  return result
}
const deleteOne = async (ctx, id) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Receipt.destroy({
    where: {
      id,
    },
  })
  return result
}

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  findByUserId,
}
