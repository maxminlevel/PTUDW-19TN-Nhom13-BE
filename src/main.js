const dotenv = require('dotenv')
const api = require('./api')
const db = require('./db-sub')
const {assignObjOnce} = require('./helpers/object')
const util = require('util')

const startApp = async () => {
  const ctx = assignObjOnce(
    {},
    {
      config: dotenv.config().parsed,
      instances: {},
    }
  )
  process.on('uncaughtException', (e) => {
    console.log('Exiting due to unhandled exception', util.inspect(e))
    process.exit(1)
  })

  process.on('unhandledRejection', (e) => {
    console.log('Exiting due to unhandled rejection', util.inspect(e))
    process.exit(1)
  })

  process.on('SIGTERM', () => {
    console.log('SIGTERM received, exiting...')
    process.exit(1)
  })

  process.on('SIGINT', () => {
    console.log('SIGINT received, exiting...')
    process.exit(1)
  })

  const {sequelize} = await db.init(ctx)
  assignObjOnce(ctx.instances, {sequelize})
  await db.start(ctx)

  const {app} = await api.init(ctx)
  assignObjOnce(ctx.instances, {app})
  await api.start(ctx)
  // console.log(util.inspect(ctx, 0, 3, 1))
}

startApp()
