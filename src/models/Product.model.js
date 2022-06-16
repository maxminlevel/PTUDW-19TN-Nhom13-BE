const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Product = sequelize.define('Product', {
    Name: {type: DataTypes.STRING},
    Images: {type: DataTypes.ARRAY(DataTypes.STRING)},
    Price: {type: DataTypes.DOUBLE},
  })
}

module.exports = {
  init,
}
