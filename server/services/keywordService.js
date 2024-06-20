const KeyWord = require('../models/keywordModel')
const Meetup = require('../models/meetupModel')
const MeetupKeyWord = require('../models/meetupKeywordModel')
const ApiErrors = require('../error/ApiErrors')
const { CHECK_RESULT } = require('../config/constants')

class KeywordService {
    async getAllKeywords() {
        const keywords = await KeyWord.findAll()
        if (!keywords){
            return {message: "keywords list was empty"}
        }
        return keywords
    }

    async createKeyword(word) {
        const candidateKeyword = await KeyWord.findOne({where: {word}})
        if (candidateKeyword) {
            return ApiErrors.badRequest("This keyword already exists")
        }
        const result = await KeyWord.create({word})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Keyword was not created")
        }
        return {message: "Keyword created"}
    }

    async editKeyword(word, id) {
        const candidateKeyword = await KeyWord.findByPk(id)
        if (!candidateKeyword) {
            return ApiErrors.notFound("there's no keyword with such id")
        }
        const result = await KeyWord.update({word}, {where: {id}})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Keyword was not updated")
        }
        return {message: "Keyword updated"}
    }

    async deleteKeyword(id) {
        const candidateKeyword = await KeyWord.findByPk(id)
        if (!candidateKeyword) {
            return ApiErrors.notFound("there's no keyword with such id")
        }
        const result = await KeyWord.destroy({where: {id}})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Keyword was not deleted")
        }
        return {message: "Keyword deleted"}
    }

    async addKeyword(id, word) {
        const candidateKeyword = await KeyWord.findOne({where: {word}})
        if (!candidateKeyword) {
            return ApiErrors.notFound("there's no such keyword")
        }
        const candidateMeetup = await Meetup.findByPk(id)
        if (!candidateMeetup) {
            return ApiErrors.notFound("there's no meetup with such id")
        }
        const result = await MeetupKeyWord.create({meetupId: id, keyWordId: candidateKeyword.id})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Keyword was not added to meetup")
        }
        return {message: "Keyword added to meetup"}
    }
}

module.exports = new KeywordService()