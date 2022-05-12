var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({
    a: '2',
  })
})

const test = (req, res, next) => {
  res.send({
    a: '2',
  })
}

module.exports = test
