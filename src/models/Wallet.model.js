const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Wallet = sequelize.define('Wallet', {
    Money: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    Debt: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    Type: {
      type: DataTypes.STRING,
      defaultValue: 'basic',
    },
  })
}

module.exports = {
  init,
}
