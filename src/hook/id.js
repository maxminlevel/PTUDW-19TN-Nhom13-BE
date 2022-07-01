const useInt = async (req, res, next) => {
  req.ctx.mergeData(req.params)
  next()
}

module.exports = {useInt}
