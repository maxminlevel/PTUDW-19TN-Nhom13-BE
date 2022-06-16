const {DataTypes} = require('sequelize')

const init = (sequelize) => {
  const PackProduct = sequelize.define('PackProduct', {
    Limit: {type: DataTypes.INTEGER},
    // PackId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Pack,
    //     key: 'id',
    //   },
    // },
    // ProductId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Product,
    //     key: 'id',
    //   },
    // },
  })
}

module.exports = {
  init,
}
