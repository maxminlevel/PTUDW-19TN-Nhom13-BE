const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Location = sequelize.define('Location', {
    Name: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    LoadSize: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: 'ALREADY',
    },
  })
}

module.exports = {
  init,
}
