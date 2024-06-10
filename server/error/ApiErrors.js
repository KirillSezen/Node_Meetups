const { application } = require("express")
const { StatusCodes } = require('http-status-codes')

class ApiErrors extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiErrors(StatusCodes.BAD_REQUEST, message)
    }

    static forbidden(message) {
        return new ApiErrors(StatusCodes.FORBIDDEN, message)
    }

    static internal(message) {
        return new ApiErrors(StatusCodes.INTERNAL_SERVER_ERROR, message)
    }
}

module.exports = ApiErrors