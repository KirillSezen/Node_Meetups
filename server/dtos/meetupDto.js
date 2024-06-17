const Joi = require('joi')

const createMeetupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    time: Joi.date().required(),
    place: Joi.string().required()
})

const updateMeetupSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    time: Joi.date(),
    place: Joi.string()
})

module.exports = {
    createMeetupSchema,
    updateMeetupSchema
}