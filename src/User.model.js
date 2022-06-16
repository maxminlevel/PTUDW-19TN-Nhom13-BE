const {DataTypes} = require('sequelize')
const init = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  })
  return User
}

module.exports = {
  init,
}
