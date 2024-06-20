const Meetup = require('../models/meetupModel')
const KeyWord = require('../models/keywordModel')
const User = require('../models/userModel')
const ApiErrors = require('../error/ApiErrors')
const FilterService = require('./filtersService')
const { CHECK_RESULT } = require('../config/constants')

class MeetupService {
    async getAllMeetups(limit, page, search, sort, order, description) {
        const offset = FilterService.formateOffset(page, limit)
        const whereConditions = FilterService.formateWhereconditions(search, description)
        const orderConditions = FilterService. formateOrederconditions(sort, order)
        const meetups = await Meetup.findAll({
            limit,
            offset,
            where: whereConditions,
            include: [
                {
                    model: KeyWord,
                    attributes: ['word'],
                    through: {
                        attributes: []
                    },
                    required: false
                }
            ],
            order: orderConditions
        })
        if (!meetups){
            return {message: "meetups list was empty"}
        }
        return meetups
    }

    async getCurrentMeetup(id) {
        const meetup = await Meetup.findOne({
            where: {id},
            include: [
                {
                    model: KeyWord,
                    attributes: ['word'],
                    through: {
                        attributes: []
                    }
                } 
            ]
        })
        if (!meetup){
            return ApiErrors.notFound("there's no meetup with such id")
        }
        return meetup
    }

    async createMeetup(name, description, time, place, userId) {
        const user = await User.findByPk(userId)
        if (!user) {
            return ApiErrors.notFound("there's no such user")
        }
        const candidateMeetup = await Meetup.findOne({where: {name}}) 
        if (candidateMeetup) {
            return ApiErrors.badRequest("This meetup already exists")
        } 
        const result = await user.createMeetup({name, description, time, place, userId})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Meetup was not created")
        }
        return {message: "Meetup created"}
    }
        
    async updateMeetup(name, description, time, place, id) {
        const candidateMeetup = await Meetup.findByPk(id)
        if (!candidateMeetup) {
            return ApiErrors.notFound("there's no meetup with such id")
        }
        const result = await Meetup.update({name, description, time, place}, {where: {id}})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Meetup was not updated")
        }
        return {message: "Meetup updated"}
    }

    async deleteMeetup(id) {
        const candidateMeetup = await Meetup.findByPk(id)
        if (!candidateMeetup) {
            return ApiErrors.notFound("there's no meetup with such id")
        }
        const result = await Meetup.destroy({where: {id}})
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("Meetup was not deleted")
        }
        return {message: "Meetup deleted"}
    }

    async signupToMeetup(id, userid) {
        const user = await User.findByPk(userid)
        if (!user) {
            return ApiErrors.unauthorized("User with this email is missing")
        }
        const meetup = await Meetup.findByPk(id)
        if (!meetup) {
            return ApiErrors.notFound("there's no meetup with such id")
        }
        const alreadyRegistered = await user.getMeetups({ where: { id } });
        if (alreadyRegistered.length > CHECK_RESULT) {
            return ApiErrors.badRequest("User was already signed to this meetup")
        }
        const result = await user.addMeetup(meetup)
        if (result === CHECK_RESULT) {
            return ApiErrors.internal("User was not signed to meetup")
        }
        return {message: "User signed to meetup"}
    } 
}
module.exports = new MeetupService()