const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    Fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CitizenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DoB: {
      type: DataTypes.DATE,
    },
    Address: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    Status: {
      type: DataTypes.STRING,
    },
  })
}

module.exports = {
  init,
}
