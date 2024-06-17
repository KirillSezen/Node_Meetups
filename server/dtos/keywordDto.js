const Joi = require('joi')

const createKeywordSchema = Joi.object({
    word: Joi.string().required().min(2)
})

const updateKeywordSchema = Joi.object({
    word: Joi.string()
})

module.exports = {
    createKeywordSchema,
    updateKeywordSchema
}