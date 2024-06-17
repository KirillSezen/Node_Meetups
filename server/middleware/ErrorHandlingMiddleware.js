const ApiErrors = require('../error/ApiErrors')
const { StatusCodes } = require('http-status-codes')

function sendingResponse(err, res){
    return res.status(err.status).json({message: err.message})
}

module.exports = function (err, req, res, _next) {
    if (err instanceof ApiErrors) {
        sendingResponse(err, res);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Unexpected error'})
}