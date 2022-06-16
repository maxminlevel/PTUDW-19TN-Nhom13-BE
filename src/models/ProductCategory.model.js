const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}

module.exports = {
  init,
}
