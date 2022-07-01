var router = require('express').Router()
const _ = require('lodash')

router.get('/', (req, res) => {
  res.render('index', {
    author: 'Group 13',
  })
})

const {emotions, categories, products, zodiacs} = require('@/public/data')

router.get('/task1', (req, res) => {
  res.render('task1', {
    author: '19120015 - Trinh Nguyen Hung',
    emotions: emotions,
  })
})

router.get('/task2', (req, res) => {
  let salary = parseFloat(req.query.salary || 0)
  jars = [
    (salary * 55) / 100,
    (salary * 10) / 100,
    (salary * 5) / 100,
    (salary * 10) / 100,
    (salary * 10) / 100,
    (salary * 10) / 100,
  ]
  res.render('task2', {
    author: '19120690 - Võ Văn Toàn',
    salary: salary,
    jars: jars,
  })
})

router.post('/task2', (req, res) => {
  let salary = parseFloat(req.body.salary || 0)
  jars = [
    (salary * 55) / 100,
    (salary * 10) / 100,
    (salary * 5) / 100,
    (salary * 10) / 100,
    (salary * 10) / 100,
    (salary * 10) / 100,
  ]
  res.render('task2', {
    author: '19120690 - Võ Văn Toàn',
    salary: salary,
    jars: jars,
  })
})

router.get('/task2/jars', (req, res) => {
  let salary = parseFloat(req.query.salary || 0)
  jars = {
    'Necessity account': (salary * 55) / 100,
    'Financial freedom account': (salary * 10) / 100,
    'Give Account': (salary * 5) / 100,
    'Education account': (salary * 10) / 100,
    'Long-term saving for spending account': (salary * 10) / 100,
    'Play account': (salary * 10) / 100,
  }
  res.json({jars, salary})
})

router.get('/task3', (req, res) => {
  let catID = req.query.catID || 0
  let _products = products

  if (catID) {
    _products = products.filter((item) => item.category == catID)
  }

  res.render('task3', {
    author: '19120033 - Phan Lộc Sơn',
    categories: categories,
    products: _products,
  })
})

router.get('/task4', (req, res) => {
  res.locals.zodiacs = zodiacs

  res.render('task4', {
    author: '19120732 - Nguyễn Xuân Vỵ',
  })
})

router.get('/task4/:name', (req, res) => {
  res.locals.zodiac = zodiacs.filter((item) => item.name == req.params.name)[0]

  res.render('task4-details', {
    author: '19120732 - Nguyễn Xuân Vỵ',
  })
})

module.exports = router
