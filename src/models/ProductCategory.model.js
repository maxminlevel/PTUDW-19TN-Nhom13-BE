const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const ProductCategory = sequelize.define(
    'ProductCategory',
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
