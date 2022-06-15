const dotenv = require('dotenv').config({path: './.env'})
const api = require('./api')
const db = require('./db-sub')

db.init()

api.init()
api.start()
