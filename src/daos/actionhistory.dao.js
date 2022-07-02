const countAll = async (ctx, body) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  return await models.ActionHistory.count({
    raw: true,
    ...body,
  })
}
const findAll = async (ctx, body) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const results = await models.ActionHistory.findAll({
    raw: true,
    ...body,
  })
  return results
}
const findOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const results = await models.ActionHistory.findAll({
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
      sequelize: {models},
    },
  } = ctx
  const result = await models.ActionHistory.create(body.data)
  return result
}
const updateOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.ActionHistory.update(body.data, {
    where: body.where,
  })
  return result
}
const deleteOne = async (ctx, body) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.ActionHistory.destroy({where: body.where})
  return result
}

module.exports = {
  countAll,
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
}
