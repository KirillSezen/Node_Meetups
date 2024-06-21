const ApiErrors = require('../error/ApiErrors');
const { ERROR_DETAILS_INDEX } = require('../config/constants');

const validateByDtos = (dto) => {
    return (req, res, next) => {
        const { error } = dto.validate(req.body)
        if (error) {
            res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
        } else {
            next()
        }
    }
}

module.exports = {
    validateByDtos
}