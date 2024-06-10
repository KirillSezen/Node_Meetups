const ApiErrors = require('../error/ApiErrors')

function sendingResponse(err, res){
    return res.status(err.status).json({message: err.message})
}

module.exports = function (err, req, res, _next) {
    if (err instanceof ApiErrors) {
        sendingResponse(err, res);
    }
    return res.status(500).json({message: 'Unexpected error'})
}