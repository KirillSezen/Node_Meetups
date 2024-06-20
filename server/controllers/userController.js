const { sendResponse } = require('../services/responseService');
const UserService = require('../services/userService')

class UserController {
    async getUser(req, res) {
        const userId = req.user.id
        const user = await UserService.getUser(userId)
        sendResponse(res, user)
    }

}

module.exports = new UserController()