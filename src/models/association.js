function applyExtraSetup(sequelize) {
  // Code go here
  sequelize.models.Task.create({title: 'foodfs', rating: 5})
}

module.exports = {applyExtraSetup}
