const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const CureHistory = sequelize.define('CureHistory', {
    Status: {
      type: DataTypes.STRING,
    },
    TimeStart: {
      type: DataTypes.TIME,
    },
    TimeEnd: {
      type: DataTypes.TIME,
    },
  })
}

module.exports = {
  init,
}
