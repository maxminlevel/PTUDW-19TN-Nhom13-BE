const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Patient = sequelize.define(
    'Patient',
    {
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
