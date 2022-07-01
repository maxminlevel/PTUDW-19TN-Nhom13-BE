const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const CureHistory = sequelize.define(
    'CureHistory',
    {
      Status: {
        type: DataTypes.STRING,
      },
      TimeStart: {
        type: DataTypes.TIME,
      },
      TimeEnd: {
        type: DataTypes.TIME,
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
