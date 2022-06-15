const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    rating: {type: DataTypes.INTEGER, defaultValue: 3},
  })
  Task.sync()
}

module.exports = {
  init,
}
