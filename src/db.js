const {Sequelize} = require('sequelize')
const {applyExtraSetup} = require('@/models/association')
const path = require('path')
const {glob} = require('glob')
const _ = require('lodash')
const {assignObjOnce} = require('@/helpers/object')
const userService = require('./services/user.service')

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
  const {config, instances} = ctx
  let options = undefined
  if (process.env.NODE_ENV == 'production') {
    options = {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    }
  } else {
    options = {
      logging: false,
    }
  }
  const sequelize = new Sequelize(process.env.POSTGRES_URI, options)
  console.log(process.env.POSTGRES_URI)
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
    applyExtraSetup(dbContext)
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  return {sequelize}
}

const start = async (ctx) => {
  const {
    instances: {sequelize},
  } = ctx
  await sequelize.sync({force: true}) // When reset database only turn on comment
  //await sequelize.sync({alter: true}) // When reconstruct database only turn on this comment
  // When no need to update database diagram, turn off both

  await fillSampleData(ctx)
  return {sequelize}
}

const fillSampleData = async (ctx) => {
  const {
    instances: {sequelize},
  } = ctx

  const userService = require('./services/user.service')
  await userService.create(ctx, {username: 'user1', password: 'admin', type: 'ADMIN'})

  packService = require('./services/pack.service')
  await packService.create(ctx, {
    name: 'pack1',
    limitbyprod: 10,
    limitbytime: 10,
    timelimit: 10,
    receiptdetailid: null,
  })

  await packService.create(ctx, {
    name: 'pack2',
    limitbyprod: 10,
    limitbytime: 10,
    timelimit: 10,
    receiptdetailid: null,
  })

  const productService = require('./services/product.service')
  await productService.create(ctx, {
    name: 'product1',
    images: ['imagelink1'],
    price: 1000,
  })
  await productService.create(ctx, {
    name: 'product2',
    images: ['imagelink2'],
    price: 1000,
  })

  const packProductService = require('./services/packproduct.service')
  await packProductService.create(ctx, {
    packid: 1,
    productid: 1,
    limit: 10
  })

  await packProductService.create(ctx, {
    packid: 1,
    productid: 2,
    limit: 10
  })

  await packProductService.create(ctx, {
    packid: 2,
    productid: 1,
    limit: 10
  })
}


module.exports = {
  init,
  start,
}
