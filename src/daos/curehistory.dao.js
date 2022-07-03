const { Op } = require("sequelize");

const countAll = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  return await models.CureHistory.count({
    raw: true,
    ...body,
  })
}
const findAll = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const results = await models.CureHistory.findAll({
    raw: true,
    ...body,
  })
  return results
}

const findByTimeState = async (ctx, startTime, stopTime, states) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const results = await models.CureHistory.findAll({
    where: {
      TimeStart: {
        [Op.lte]: startTime,
      },
      TimeStop: {
        [Op.gte]: stopTime,
      },
      State: {
        [Op.in]: states,
      },
    },
    raw: true,
    attributes: ["TimeStart", "TimeStop", "State"],
  })
  return results
}

const findByTimeChangeState = async (ctx, startTime, stopTime, states) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const results = await models.CureHistory.findAll({
    where: {
      [Op.or]: {
        [Op.and]: 
        [{
          TimeStart: {
            [Op.lte]: startTime,
          },
          TimeStop: {
            [Op.gte]: startTime,
          },
          State: {
            [Op.in]: states,
          },
        }, 
        {
          TimeStart: {
            [Op.lte]: stopTime,
          },
          TimeStop: {
            [Op.gte]: stopTime,
          },
          State: {
            [Op.in]: states,
          },
        }],
      }
      
    },
    raw: true,
    attributes: ["TimeStart", "TimeStop", "State"],
  })
  return results
}

const findOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const results = await models.CureHistory.findAll({
    raw: true,
    ...body,
    limit: 1,
  })
  if (results.length == 0) {
    return null
  }
  return results[0]
}
const insertOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.CureHistory.create(body.data)
  return result
}
const updateOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.CureHistory.update(body.data, { where: body.where })
  return result
}
const deleteOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: { models },
    },
  } = ctx
  const result = await models.CureHistory.destroy({ where: body.where })
  return result
}

module.exports = {
  countAll,
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  findByTimeState,
  findByTimeChangeState
}
