const _ = require('lodash')
const StatusCodes = require('http-status-codes')
const {assignObjOnce} = require('@/helpers/object')

const registerReqContext = (app, ctx) => {
  app.all('*', function contextCreator(req, res, next) {
    req.ctx = assignObjOnce({req, res, _private: {data: {}}}, ctx)

    req.ctx.set = _.partial(_.set, req.ctx._private)
    req.ctx.get = _.partial(_.get, req.ctx._private)
    req.ctx.assign = _.partial(_.assign, req.ctx._private)
    req.ctx.merge = _.partial(_.merge, req.ctx._private)
    req.ctx.isNil = (prop) => _.isNil(_.get(req.ctx._private, prop))

    Object.defineProperties(req.ctx, {
      data: {
        get: () => req.ctx._private.data,
        set: (value) => (req.ctx._private.data = value),
      },
    })

    req.ctx.mergeData = _.partial(_.merge, req.ctx._private.data)
    req.ctx.setData = _.partial(_.set, req.ctx._private.data)

    next()
  })
}

const registerResContext = (app) => {
  const successCreator = (req, res) =>
    function success(data, options) {
      const metadata = _.get(options, 'metadata')

      const statusCode = _.get(
        options,
        'statusCode',
        res.statusCode || StatusCodes.OK
      )

      res.status(statusCode).json({
        success: true,
        metadata,
        data,
      })
    }

  const failCreator = (req, res) =>
    function fail(statusCode = StatusCodes.BAD_REQUEST, error, errorCodes) {
      res.status(statusCode).json({
        success: false,
        error,
        errorCodes,
      })
    }

  app.all('*', (req, res, next) => {
    res.success = successCreator(req, res)
    res.fail = failCreator(req, res)
    next()
  })
}

module.exports = {
  registerReqContext,
  registerResContext,
}
