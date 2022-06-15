const {Sequelize} = require('sequelize')
const {applyExtraSetup} = require('./models/association')
const path = require('path')
const {glob} = require('glob')
const _ = require('lodash')
const {assignObjOnce} = require('./helpers/object')

const initSchemas = (ctx) => {
  const {sequelize} = ctx
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
  console.log(ctx)
  try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
    initSchemas(dbContext)
    applyExtraSetup(dbContext)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  return {sequelize}
}

module.exports = {
  init,
  start,
}
