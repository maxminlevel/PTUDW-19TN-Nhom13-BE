const _ = require('lodash')

module.exports = {
  page: {
    request: (req, res, next) => {
      req.ctx.mergeData({
        paging: {
          page: req.body.page || 1,
          limit: req.body.limit || 100,
        },
      })
      next()
    },
  },
}
