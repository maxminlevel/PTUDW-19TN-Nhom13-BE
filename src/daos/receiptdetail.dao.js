const findAll = async (ctx) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    return await models.ReceiptDetail.findAll({
      raw: true,
      attributes: ['id', 'Price', 'NumberOfProduct', 'ReceiptId'],
    })
  }
  const findOne = async (ctx, id) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ReceiptDetail.findAll({
      where: {id},
      raw: true,
      limit: 1,
      attributes: ['id', 'Price', 'NumberOfProduct', 'ReceiptId'],
    })
    return result
  }
  const insertOne = async (ctx, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ReceiptDetail.create(data)
    return result
  }
  const updateOne = async (ctx, id, data) => {
    const {
      instances: {
        sequelize: {models},
      },
    } = ctx
    const result = await models.ReceiptDetail.update(data, {
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
    const result = await models.ReceiptDetail.destroy({
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
  