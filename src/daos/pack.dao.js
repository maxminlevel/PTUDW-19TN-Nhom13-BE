const findAll = async (ctx) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    return await models.Pack.findAll({
      raw: true,
      attributes: ['id', 'Name', 'LimitByProd', 'LimitByTime', 'TimeLimit', 'ReceiptDetailId'],
    })
  }
  const findOne = async (ctx, id) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.Pack.findAll({
      where: {id},
      raw: true,
      limit: 1,
      attributes: ['id', 'Name', 'LimitByProd', 'LimitByTime', 'TimeLimit', 'ReceiptDetailId'],
    })
    return result
  }
  const insertOne = async (ctx, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.Pack.create(data)
    return result
  }
  const updateOne = async (ctx, id, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.Pack.update(data, {
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
    const result = await models.Pack.destroy({
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
  