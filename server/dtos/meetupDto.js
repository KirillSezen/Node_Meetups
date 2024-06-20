const Joi = require('joi')
const { MAX_DATE_YEAR, MIN_DATE_HOURS, DEFAULT_LIMIT, DEFAULT_PAGE } = require('../config/constants')

const createMeetupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    time: Joi.date().min(new Date().setHours(MIN_DATE_HOURS)).max(new Date().setFullYear(new Date().getFullYear() + MAX_DATE_YEAR)).required(),
    place: Joi.string().required()
})

const updateMeetupSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    time: Joi.date().min(new Date().setHours(MIN_DATE_HOURS)).max(new Date().setFullYear(new Date().getFullYear() + MAX_DATE_YEAR)),
    place: Joi.string()
})

const allMeetupsQuerySchema = Joi.object({
    limit: Joi.number().integer().min(1).default(DEFAULT_LIMIT),
    page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
    search: Joi.string(),
    sort: Joi.string(),
    order: Joi.string(),
    description: Joi.string()
});

module.exports = {
    createMeetupSchema,
    updateMeetupSchema,
    allMeetupsQuerySchema
}