const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const PatientRelate = sequelize.define(
    'PatientRelate',
    {},
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
