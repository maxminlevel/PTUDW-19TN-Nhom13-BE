const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const ActionHistory = sequelize.define(
    'ActionHistory',
    {
      Time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      Action: {
        type: DataTypes.STRING,
        defaultValue: 'DO SOMETHING',
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
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
