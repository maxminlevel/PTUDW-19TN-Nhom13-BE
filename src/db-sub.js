const {Sequelize} = require('sequelize')
require('dotenv').config()
const {applyExtraSetup} = require('./models/association')
const path = require('path')
const {glob} = require('glob')
const _ = require('lodash')

const initSchemas = (sequelize) => {
  const modelPath = path.resolve(__dirname, 'models')
  const models = glob.sync(path.join(modelPath, '**/*.model.js'), {
    dot: true,
  })
  _.each([...models], (filePath) => {
    const model = require(filePath)
    const {name: modelName} = path.parse(filePath)
    const name = _.replace(modelName, /(^index$)|(\.model$)/, '')
    model.init(sequelize)
    console.log(`-> table: ${name}`)
  })
}

const init = () => {
  const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    logging: false,
  })
  try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
    initSchemas(sequelize)
    applyExtraSetup(sequelize)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = {
  init,
}
