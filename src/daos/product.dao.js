const { Op } = require("sequelize");

const findAll = async (ctx) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  return await models.Product.findAll({
    raw: true,
    attributes: ['id', 'Name', 'Images', 'Price', 'Unit'],
  })
}

const find = async (ctx, ids) => {
  const {
    instances: {
      sequelize: { models }
    }
  } = ctx

  return await models.Product.findAll({
    where: {
      id: {
        [Op.or]: ids
      }
    },
    raw: true,
    attributes: ['id', 'Name', 'Images', 'Price', 'Unit'],
  })
}

const findUsedByTime = async (ctx, productId, timeStart, timeStop) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Product.findAll({
    where: { 
      [Op.and]: [
        {
          createdAt: {
            [Op.gte]: timeStart,
          },
          createdAt: {
            [Op.lte]: timeStop,
          },
          ProductId: productId,
        },
      ]
     },
    raw: true,
    attributes: ['id', 'Name', 'Images', 'Price', 'Unit'],
  })
  return result
}

const findOne = async (ctx, id) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Product.findAll({
    where: { id },
    raw: true,
    limit: 1,
    attributes: ['id', 'Name', 'Images', 'Price', 'Unit'],
  })
  return result
}
const insertOne = async (ctx, data) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Product.create(data)
  return result
}
const updateOne = async (ctx, id, data) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.Product.update(data, {
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
  const result = await models.Product.destroy({
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
  find,
  findUsedByTime,
}
