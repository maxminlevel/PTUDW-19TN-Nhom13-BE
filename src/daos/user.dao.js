const list = async (ctx) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  return await models.User.findAll()
}
const get = async (ctx, id) => {
  const {
    instances: {
      sequelize: {models},
    },
  } = ctx
  const result = await models.User.findAll({
    where: {id},
  })
  return result
}
const insert = async (ctx, data) => {}
const update = async (ctx, id, data) => {}
const remove = async (ctx, id) => {}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
}
