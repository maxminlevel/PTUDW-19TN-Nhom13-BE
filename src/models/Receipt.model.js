const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Receipt = sequelize.define(
    'Receipt',
    {
      Time: {type: DataTypes.TIME},
      Status: {
        type: DataTypes.TEXT,
        defaultValue: 'WAITING',
      },
      PriceTotal: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
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
