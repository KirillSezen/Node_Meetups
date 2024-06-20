const AuthService = require('../services/authService')
const TokenService = require('../services/tokenService')
const { sendResponse } = require('../services/responseService')

class AuthController {
    async reqistration(req, res) {
        const {email, password, role} = req.body
        const result = await AuthService.registration(email, password, role)
        sendResponse(res, result)
    }

    async login(req, res) {
        const {email, password} = req.body
        const result = await AuthService.login(email, password)
        sendResponse(res, result)
    }

    async logout(req, res) {
        // Сервер не хранит информацию о токене, поэтому просто отправляем сообщение о выходе
        const result = await AuthService.logout()
        sendResponse(res, result)
    }

    async refresh(req, res) {
        const {refreshToken} = req.body
        const result = await TokenService.refreshToken(refreshToken)
        sendResponse(res, result)
    }
}

module.exports = new AuthController()