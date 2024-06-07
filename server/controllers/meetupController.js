const ApiErrors = require('../error/ApiErrors')

class MeetupController {
    async getAllMeetups(req, res) {
        res.json('meetups')
    }

    async getCurrentMeetup(req, res, next) {
        const {id} = req.query
        if(!id) return next(ApiErrors.badRequest("no id"))

            res.json(id)
    }

    async createMeetup(req, res) {

    }

    async editMeetup(req, res) {

    }

    async deleteMeetup(req, res) {

    }
}

module.exports = new MeetupController()