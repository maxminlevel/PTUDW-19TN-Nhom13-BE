const {Sequelize} = require('sequelize')
const {applyExtraSetup} = require('./models/association')
const path = require('path')
const {glob} = require('glob')
const _ = require('lodash')
const {assignObjOnce} = require('./helpers/object')

const initSchemas = async (ctx) => {
  const {sequelize} = ctx
  const modelPath = path.resolve(__dirname, 'models')
  const models = glob.sync(path.join(modelPath, '**/*.model.js'), {
    dot: true,
  })
  _.each([...models], (filePath) => {
    const modelFile = require(filePath)
    const {name: modelName} = path.parse(filePath)
    const name = _.replace(modelName, /(^index$)|(\.model$)/, '')
    modelFile.init(sequelize)
    console.log(`-> table: ${name}`)
  })
}

const init = async (ctx) => {
  const {config} = ctx
  const sequelize = new Sequelize(config.POSTGRES_URI, {
    logging: false,
  })
  return {sequelize}
}

const start = async (ctx) => {
  const {config, instances} = ctx
  const {sequelize} = instances

  const dbContext = assignObjOnce(
    {},
    {
      ...instances,
      sequelize,
      config,
      instances,
    }
  )
  try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
    initSchemas(dbContext)
    applyExtraSetup(dbContext) // await sequelize.sync({force: true})
    await sequelize.sync({alter: true})
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  return {sequelize}
}

module.exports = {
  init,
  start,
}
