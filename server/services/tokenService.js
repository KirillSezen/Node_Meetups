const jwt = require('jsonwebtoken')
const ApiErrors = require('../error/ApiErrors')
const User = require('../models/userModel')

class TokenService {
    async createTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: "7d"})
        return {accessToken, refreshToken}
    }

    async refreshToken(refreshToken) {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH)
        const user = await User.findByPk(decoded.id)
        if(!user) {
            return ApiErrors.unauthorized("User not found")
        }
        const accessToken = jwt.sign({email: user.email, id: user.id}, process.env.JWT_ACCESS, {expiresIn: '30m'})
        return accessToken
    }
}

module.exports = new TokenService()