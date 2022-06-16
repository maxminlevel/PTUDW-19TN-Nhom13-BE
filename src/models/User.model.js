const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const User = sequelize.define('User', {
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
  })
}

module.exports = {
  init,
}
