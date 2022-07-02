const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      Name: {type: DataTypes.STRING},
      Images: {type: DataTypes.ARRAY(DataTypes.STRING)},
      Price: {type: DataTypes.DOUBLE},
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
