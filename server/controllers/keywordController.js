const ApiErrors = require('../error/ApiErrors')
const KeyWord = require('../models/keywordModel')
const MeetupKeyWord = require('../models/meetupKeywordModel')
const keywordDto = require('../dtos/keywordDto')

class KeyWordController {
    async getAllKeyWords(req, res) {
    const keywords = await KeyWord.findAll()
    return res.json(keywords);
    }

    async editKeyWord(req, res) {
        const {error} = keywordDto.updateKeywordSchema.validate(req.body)
            if (error) {
                return ApiErrors.badRequest(error.details[0].message)
            }
        const {id} = req.params
        const newWord = req.body.word
        const result = await KeyWord.update({word: newWord}, {where: {id}})
        res.json(result)
    }

    async deleteKeyWord(req, res) {
        const {id} = req.params
        const result = await KeyWord.destroy({where: {id}})
        return res.json(result)
    }

    async createKeyWord(req, res) {
        const {word} = req.body
        const keyword = await KeyWord.create({word})
        return res.json(keyword)
    }

    async addKeyWord(req, res) {
        const {id} = req.params
        const {word} = req.body.word
        const keywordId = await KeyWord.findOne({where: word})
        console.log(keywordId)
        const meetupkeyword = await MeetupKeyWord.create({meetupId: id, keyWordId: keywordId.id})
        return res.json(meetupkeyword)
    }
}

module.exports = new KeyWordController()