const findAll = async (ctx) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  return await models.User.findAll({
    raw: true,
    attributes: ['id', 'Username', 'Status', 'Type'],
  })
}
const findOne = async (ctx, id) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.User.findAll({
    where: {id},
    raw: true,
    limit: 1,
    attributes: ['id', 'Username', 'Status', 'Type'],
  })
  return result
}
const insertOne = async (ctx, data) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.User.create(data)
  return result
}
const updateOne = async (ctx, id, data) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.User.update(data, {
    where: {
      id,
    },
  })
  return result
}
const deleteOne = async (ctx, id) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.User.destroy({
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
}
