const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const ReceiptDetail = sequelize.define('ReceiptDetail', {
    Price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    NumberOfProduct: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })
}

module.exports = {
  init,
}
