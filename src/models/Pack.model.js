const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Pack = sequelize.define(
    'Pack',
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LimitByProd: {type: DataTypes.INTEGER},
      LimitByTime: {type: DataTypes.INTEGER},
      TimeLimit: {type: DataTypes.STRING},
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
