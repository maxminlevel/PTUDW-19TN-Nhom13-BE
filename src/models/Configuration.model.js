const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Configuration = sequelize.define(
    'Configuration',
    {
      Type: {
        type: DataTypes.STRING,
      },
      Name: {
        type: DataTypes.STRING,
      },
      Value: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    }
  )
}

module.exports = {
  init,
}
