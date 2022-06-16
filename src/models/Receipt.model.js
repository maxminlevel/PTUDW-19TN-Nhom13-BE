const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  console.log(__dirname)
  const Receipt = sequelize.define('Receipt', {
    Time: {type: DataTypes.TIME},
    Status: {
      type: DataTypes.TEXT,
      defaultValue: 'WAITING',
    },
    PriceTotal: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  })
}

module.exports = {
  init,
}
