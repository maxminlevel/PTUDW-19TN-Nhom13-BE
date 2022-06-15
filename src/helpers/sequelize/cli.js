require('dotenv').config()
const {Sequelize} = require('sequelize')
const {assignObjOnce} = require('../object')
const [, , ...cmds] = process.argv

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  logging: false,
})
const command = async (query, meta = false) => {
  console.log(query)
  try {
    const [results, metadata] = await sequelize.query(query)
    console.log(results)
    if (meta) {
      let data = assignObjOnce(
        {},
        {command: metadata.command, rowCount: metadata.rowCount}
      )
      console.log(data)
    }
  } catch (err) {
    console.log(err)
  }
  process.exit(0)
}

if (cmds[1] == '1') {
  command(cmds[0], true)
}
command(cmds[0])
