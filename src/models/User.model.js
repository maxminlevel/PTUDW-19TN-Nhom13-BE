const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        defaultValue: 'UNLOCK',
      },
      Type: {
        type: DataTypes.STRING,
        defaultValue: 'USER',
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
