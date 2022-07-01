const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Location = sequelize.define(
    'Location',
    {
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
