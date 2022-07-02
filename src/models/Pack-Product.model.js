const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const PackProduct = sequelize.define(
    'PackProduct',
    {
      Limit: {type: DataTypes.INTEGER},
    },
    {
      paranoid: true,
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    }
  )
}

module.exports = {
  init,
}
