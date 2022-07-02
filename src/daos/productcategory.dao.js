const findAll = async (ctx) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    return await models.ProductCategory.findAll({
      raw: true,
      attributes: ['id', 'Name'],
    })
  }
  const findOne = async (ctx, id) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ProductCategory.findAll({
      where: {id},
      raw: true,
      limit: 1,
      attributes: ['id', 'Name'],
    })
    return result
  }
  const insertOne = async (ctx, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ProductCategory.create(data)
    return result
  }
  const updateOne = async (ctx, id, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ProductCategory.update(data, {
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
    const result = await models.ProductCategory.destroy({
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
  