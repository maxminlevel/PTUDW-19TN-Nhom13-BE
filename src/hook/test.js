let i = 0
const list = (req, res, next) => {
  console.log('Test Midlleware', i++)
  next()
}

module.exports = {list}
