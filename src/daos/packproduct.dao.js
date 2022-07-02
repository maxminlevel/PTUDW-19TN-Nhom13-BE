const findAll = async (ctx) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    return await models.PackProduct.findAll({
      raw: true,
      attributes: ['ProductId', 'PackId', 'Limit'],
    })
  }
  const findOne = async (ctx, ProductId, PackId) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.PackProduct.findAll({
      where: {ProductId,
        PackId},
      raw: true,
      limit: 1,
      attributes: ['ProductId', 'PackId', 'Limit'],
    })
    return result
  }
  const insertOne = async (ctx, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.PackProduct.create(data)
    return result
  }
  const updateOne = async (ctx, ProductId, PackId, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.PackProduct.update(data, {
      where: {
        ProductId, 
        PackId,
      },
    })
    return result
  }
  const deleteOne = async (ctx, ProductId, PackId) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.PackProduct.destroy({
      where: {
        ProductId, 
        PackId,
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
  