const { 
  CustomAPIError
} = require('../errors');

const { StatusCodes } = require('http-status-codes')
const customErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
}

module.exports = customErrorHandler
