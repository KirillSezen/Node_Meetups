const Joi = require('@hapi/joi')
const { MIN_PASSWORDnEMAIL_LENGHT } = require('../config/constants')

const createUserSchema = Joi.object({
    email: Joi.string().required().email().min(MIN_PASSWORDnEMAIL_LENGHT),
    password: Joi.string().required().min(MIN_PASSWORDnEMAIL_LENGHT),
    role: Joi.string().valid('USER', 'ORGANIZER')
})

const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(MIN_PASSWORDnEMAIL_LENGHT),
    role: Joi.string().valid('USER', 'ORGANIZER')
})


module.exports = {
    createUserSchema,
    updateUserSchema
}