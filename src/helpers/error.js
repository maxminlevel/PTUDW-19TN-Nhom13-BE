const _ = require('lodash')
const StatusCodes = require('http-status-codes')

class ClientError extends Error {
  statusCode = StatusCodes.BAD_REQUEST
  errorCodes = ['BAD_REQUEST']

  constructor(detail, statusCode) {
    super(JSON.stringify(detail))
    this.detail = detail

    this.statusCode = statusCode || this.statusCode
  }

  withCodes(codes) {
    this.errorCodes = _.castArray(codes || [])

    return this
  }
}

class AuthorizationError extends Error {
  statusCode = StatusCodes.UNAUTHORIZED
  errorCodes = ['UNAUTHORIZED']

  constructor(message = 'not allowed') {
    super(message)
    this.detail = {message}
  }

  withCodes(codes) {
    this.errorCodes = _.castArray(codes || [])

    return this
  }
}

class ForbiddenError extends Error {
  statusCode = StatusCodes.FORBIDDEN
  errorCodes = ['FORBIDDEN']

  constructor(message = 'You are not allowed to do this action!') {
    super(message)
    this.detail = {message}
  }

  withCodes(codes) {
    this.errorCodes = _.castArray(codes || [])

    return this
  }
}

const clientErrorHandler = (error, req, res, next) => {
  if (error instanceof ClientError) {
    res.fail(StatusCodes.BAD_REQUEST, error.detail, error.errorCodes)

    return
  }

  if (error instanceof AuthorizationError) {
    res.fail(StatusCodes.UNAUTHORIZED, error.detail, error.errorCodes)

    return
  }

  if (error instanceof ForbiddenError) {
    res.fail(StatusCodes.FORBIDDEN, error.detail, error.errorCodes)

    return
  }

  next(error)
}

module.exports = {
  clientErrorHandler,
  ClientError,
  AuthorizationError,
  ForbiddenError,
}
