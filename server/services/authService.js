const { CHECK_RESULT, DEFAULT_SALT } = require('../config/constants')
const bcrypt = require('bcryptjs')
const TokenService = require('./tokenService')
const User = require('../models/userModel')
const ApiErrors = require('../error/ApiErrors')

class AuthService {
    async hashingPassword(password) {
        const hash = await bcrypt.hash(password, DEFAULT_SALT)
        return hash
    }

    async comparingPassword(password, hash) {
        const compare = await bcrypt.compare(password, hash)
        return compare
    }

    async registration(email, password, role) {
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return ApiErrors.badRequest("User with this email already exists")
        }
        const hashPassword = await this.hashingPassword(password)
        const result = User.create({email, password: hashPassword, role})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("User was not registrated")
        }
        return {message: "User registrated"}
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            return ApiErrors.unauthorized("User with this email is missing")
        }
        const compareResult = await this.comparingPassword(password, user.password)
        if (compareResult) {
            const payload = {
                email: user.email,
                id: user.id
            }
            const result = await TokenService.createTokens(payload)
            if (result === CHECK_RESULT) {
                return ApiErrors.internal("Tokens was not created")
            }
            return result
        } else {
            return ApiErrors.unauthorized("Incorrect password")
        }
    }

    async logout() {
       return { message: "Successfully logged out" }
    }
}

module.exports = new AuthService()