const findAll = async (ctx) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    return await models.Product.findAll({
      raw: true,
      attributes: ['id', 'Name', 'Images', 'Price'],
    })
  }
  const findOne = async (ctx, id) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.Product.findAll({
      where: {id},
      raw: true,
      limit: 1,
      attributes: ['id', 'Name', 'Images', 'Price'],
    })
    return result
  }
  const insertOne = async (ctx, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.Product.create(data)
    return result
  }
  const updateOne = async (ctx, id, data) => {
    const {
      instances: {
        sequelize: {models},
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
        sequelize: {models},
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
  }
  