const Joi = require('@hapi/joi')

const createUserSchema = Joi.object({
    email: Joi.string().required().email().min(6),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('USER', 'ORGANIZER')
})

const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid('USER', 'ORGANIZER')
})


module.exports = {
    createUserSchema,
    updateUserSchema
}