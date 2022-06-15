const _ = require('lodash')

const assignValueOnce = (obj, prop, value) => {
  obj[prop] = value
  Object.defineProperty(obj, prop, {
    writable: false,
  })
  return obj
}

const assignObjOnce = (obj, src) => {
  _.each(src, (value, prop) => assignValueOnce(obj, prop, value))
  return obj
}

const sort = (input) => {
  if (typeof input === 'object') {
    if (input instanceof Array) {
      return input.sort((a, b) => (a > b ? 1 : -1))
    }

    const nestedObject = _.mapValues(input, (value) => sort(value))
    const keys = _.keys(input).sort((a, b) => (a > b ? 1 : -1))
    return _.reduce(
      keys,
      (obj, key) => ({...obj, [key]: nestedObject[key]}),
      {}
    )
  }
  return input
}

module.exports = {
  assignValueOnce,
  assignObjOnce,
  sort,
}
