const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const xss = require('xss-clean')
const cors = require('cors')
const app = express()
const path = require('path')
require('dotenv').config()

const whitelist = '127.0.0.1' // process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(',')
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) callback(null, true)
    else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'), false)
    }
  },
  credentials: true,
}

//app use
app.use(cors(corsOptions))
app.use('/static', express.static('public'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(xss())

app.use(express.static(path.join(__dirname, '../public')))

//routes
const router = express.Router()
const userRoute = require('./routes/users.js')

app.use('/api/v1/user/', userRoute)
module.exports = app

const db = require('./db.js')
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
