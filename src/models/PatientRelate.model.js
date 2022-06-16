const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const PatientRelate = sequelize.define('PatientRelate', {})
}

module.exports = {
  init,
}
