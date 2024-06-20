const MeetupService = require('../services/meetupService')
const { sendResponse } = require('../services/responseService');
const {DEFAULT_PAGE, DEFAULT_LIMIT} = require('../config/constants')

class MeetupController {
    async getAllMeetups(req, res) {
    const { limit = DEFAULT_LIMIT, page = DEFAULT_PAGE, search, sort, order, description } = req.query;
    const meetups = await MeetupService.getAllMeetups(limit, page, search, sort, order, description)
    sendResponse(res, meetups)
    }

    async getCurrentMeetup(req, res) {
        const {id} = req.params
        const meetup = await MeetupService.getCurrentMeetup(id)
        sendResponse(res, meetup)
    }

    async createMeetup(req, res) {
       const {name, description, time, place} = req.body
       const result = await MeetupService.createMeetup(name, description, time, place, req.user.id) 
       sendResponse(res, result)
    }

    async editMeetup(req, res) {
        const {id} = req.params
        const {name, description, time, place} = req.body
        const result = await MeetupService.updateMeetup(name, description, time, place, id)
        sendResponse(res, result)
    }

    async deleteMeetup(req, res) {
        const {id} = req.params
        const result = await MeetupService.deleteMeetup(id)
        sendResponse(res, result)
    }

    async signupToMeetup(req, res) {
        const {id} = req.params
        const userId = req.user.id
        const result = await MeetupService.signupToMeetup(id, userId)
        sendResponse(res, result)
    }
}

module.exports = new MeetupController()