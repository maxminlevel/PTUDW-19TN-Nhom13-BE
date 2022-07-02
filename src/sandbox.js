const _ = require('lodash')

const start = async (ctx) => {
  const {
    instances: {
      sequelize: {
        models: {User}
      }
    }
  } = ctx
  await User.create({firstName: 'Jane', lastName: 'Doe'})
  await User.create({firstName: 'Jane', lastName: 'Doe'})
  await User.create({firstName: 'Jane', lastName: 'Doe'})
  await User.create({firstName: 'Jane', lastName: 'Doe'})
}

module.exports = {
  start,
}
