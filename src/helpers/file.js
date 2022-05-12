var fs = require('fs-extra')
var path = require('path')

export const readJsonAsync = async (fileName, defaultValue = {}) => {
  try {
    return await fs.readJson(fileName)
  } catch (err) {
    return defaultValue
  }
}

export const readJsonSync = (fileName, defaultValue = {}) => {
  try {
    return fs.readJsonSync(fileName)
  } catch (err) {
    return defaultValue
  }
}

export const writeFileAsync = async (fileName, data) => {
  await ensureDir(fileName)

  return await fs.writeFile(fileName, data, {flag: 'w'})
}

export const appendFileAsync = async (fileName, data) => {
  await ensureDir(fileName)

  return await fs.appendFile(fileName, data, {flag: 'a'})
}

export const readAsync = async (fileName) => {
  try {
    const content = await fs.readFile(fileName)

    return content.toString()
  } catch (error) {
    return null
  }
}

export const ensureDir = async (fileName) => {
  await fs.ensureDir(path.dirname(fileName))
}
