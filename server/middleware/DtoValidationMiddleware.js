const meetupDto = require('../dtos/meetupDto')
const keywordDto = require('../dtos/keywordDto')
const userDto = require('../dtos/userDto')
const ApiErrors = require('../error/ApiErrors')
const { ERROR_DETAILS_INDEX } = require('../config/constants')

const validateCreateMeetup = (req, res, next) => {
    const {error} = meetupDto.createMeetupSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateUpdateMeetup = (req, res, next) => {
    const {error} = meetupDto.updateMeetupSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateAllMeetupsQuery = (req, res, next) => {
    const {error} = meetupDto.allMeetupsQuerySchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateCreateKeyword = (req, res, next) => {
    const {error} = keywordDto.createKeywordSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateUpdateKeyword = (req, res, next) => {
    const {error} = keywordDto.updateKeywordSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateCreateUser = (req, res, next) => {
    const {error} = userDto.createUserSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

const validateUpdateUser = (req, res, next) => {
    const {error} = userDto.updateUserSchema.validate(req.body)
    if (error) {
        res.json(ApiErrors.badRequest(error.details[ERROR_DETAILS_INDEX].message))
    } else {
       next()
    }
}

module.exports = {
    validateCreateMeetup,
    validateUpdateMeetup,
    validateAllMeetupsQuery,
    validateCreateKeyword,
    validateUpdateKeyword,
    validateCreateUser,
    validateUpdateUser
}