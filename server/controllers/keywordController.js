const KeywordService = require('../services/keywordService')
const { sendResponse } = require('../services/responseService');

class KeyWordController {
    async getAllKeyWords(req, res) {
        const keywords = await KeywordService.getAllKeywords()
        sendResponse(res, keywords)
    }

    async editKeyWord(req, res) {
        const {id} = req.params
        const {word} = req.body
        const result = await KeywordService.editKeyword(word, id)
        sendResponse(res, result)
    }

    async deleteKeyWord(req, res) {
        const {id} = req.params
        const result = await KeywordService.deleteKeyWord(id)
        sendResponse(res, result)
    }

    async createKeyWord(req, res) {
        const {word} = req.body
        const result = await KeywordService.createKeyword(word)
        sendResponse(res, result)
    }

    async addKeyWord(req, res) {
        const {id} = req.params
        const {word} = req.body
        const result = await KeywordService.addKeyword(id, word)
        sendResponse(res, result)
    }
}

module.exports = new KeyWordController()