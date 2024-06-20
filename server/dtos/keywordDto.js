const Joi = require('joi')
const { MIN_KEYWORD_LENGHT } = require('../config/constants')

const createKeywordSchema = Joi.object({
    word: Joi.string().required().min(MIN_KEYWORD_LENGHT)
})

const updateKeywordSchema = Joi.object({
    word: Joi.string()
})

module.exports = {
    createKeywordSchema,
    updateKeywordSchema
}