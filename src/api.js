const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const xss = require('xss-clean')
const cors = require('cors')
const app = express()
const path = require('path')
require('dotenv').config()
const glob = require('glob')
const _ = require('lodash')
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser')

const initMidlewareBef = () => {
  const whitelist =
    '127.0.0.1' && process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(',')
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
  app.use(cors(corsOptions))
  app.use(morgan('tiny'))
  app.use(helmet())
  app.use(xss())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.set('etag', false)
}

const initMidlewareAft = () => {
  app.use(function (req, res, next) {
    res.status(404)

    // respond with html page
    // respond with json
    if (req.accepts('json')) {
      res.json({error: 'Not found'})
      return
    }

    // default to plain-text. send()
    res.type('txt').send('Not found')
  })
}

const initRoutes = () => {
  const routePath = path.resolve(__dirname, 'routes')
  const priorityRouters = glob.sync(path.join(routePath, '**/index.js'), {
    dot: true,
  })
  const routers = glob.sync(path.join(routePath, '**/*.route.js'), {
    dot: true,
  })
  const orderedPriorityRouters = _.sortBy(
    priorityRouters,
    (filePath) => _.split(filePath, '/').length
  )
  _.each([...orderedPriorityRouters, ...routers], (filePath) => {
    const router = require(filePath)
    const {dir: routerDir, name: routerName} = path.parse(filePath)
    const subPath = _.replace(routerName, /(^index$)|(\.route$)/, '')
    const fullPath = path.join(routerDir, subPath)
    const rootPath = path.join('/', path.relative(routePath, fullPath))

    console.log(`-> api: ${rootPath}`)
    app.use(rootPath, router)
  })
}

const initEngineView = () => {
  const hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
  })

  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.static(path.join(__dirname, './public')))

  app.get('/', (req, res) => {
    res.render('index', {
      author: 'Group 13',
    })
  })

  const {emotions, categories, products, zodiacs} = require('./data')

  app.get('/task1', (req, res) => {
    res.render('task1', {
      author: '19120015 - Trinh Nguyen Hung',
      emotions: emotions,
    })
  })

  app.get('/task2', (req, res) => {
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

  app.post('/task2', (req, res) => {
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

  app.get('/task2/jars', (req, res) => {
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

  app.get('/task3', (req, res) => {
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

  app.get('/task4', (req, res) => {
    res.locals.zodiacs = zodiacs

    res.render('task4', {
      author: '19120732 - Nguyễn Xuân Vỵ',
    })
  })

  app.get('/task4/:name', (req, res) => {
    res.locals.zodiac = zodiacs.filter(
      (item) => item.name == req.params.name
    )[0]

    res.render('task4-details', {
      author: '19120732 - Nguyễn Xuân Vỵ',
    })
  })
}

const init = (ctx = null) => {
  initMidlewareBef()
  initEngineView()
  initRoutes()
  // initMidlewareAft()
}

const start = () => {
  const port = process.env.SERVER_PORT || 3000
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
  })
}

module.exports = {
  init,
  start,
}
