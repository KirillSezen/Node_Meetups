const User = require('../models/userModel')
const Meetup = require('../models/meetupModel')

class UserService {
    async getUser(userId) {
        const user = await User.findOne({
            where: {id: userId},
            include: [
                {
                    model: Meetup,
                    as: 'Meetups',
                    attributes: ['name', 'time', 'place']
                } 
            ]
        })
        if (!user){
            return ApiErrors.notFound("there's no user with such id")
        }
        return user
    }
}

module.exports = new UserService()