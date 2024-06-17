const ApiErrors = require('../error/ApiErrors')
const Meetup = require('../models/meetupModel')
const User = require('../models/userModel')
const KeyWord = require('../models/keywordModel')
const { Op } = require("sequelize")
const meetupDto = require('../dtos/meetupDto')

class MeetupController {
    async getAllMeetups(req, res) {
    let { limit, page, search, sort, order, description } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    let whereConditions = {};
    let orderConditions = [];

    if (search) {
        whereConditions = {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ]
        };
    }

    if (description) {
        whereConditions = { ...whereConditions, description: {
            [Op.ne]: null,
            [Op.ne]: ''
        }};
    }
 
    if (sort && order) {
        orderConditions = [[sort, order]];
    }

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
    });

    return res.json(meetups);
    }

    async getCurrentMeetup(req, res, _next) {
        const {id} = req.params
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
        res.json(meetup)
    }

    async createMeetup(req, res) {
        const {error} = meetupDto.createMeetupSchema.validate(req.body)
            if (error) {
                return ApiErrors.badRequest(error.details[0].message)
            }

       const {name, description, time, place} = req.body
       const user = await User.findByPk(req.user.id)
       const meetup = await user.createMeetup({name, description, time, place, userId: req.user.id})
       return res.json(meetup)
    }

    async editMeetup(req, res) {
        const {error} = meetupDto.updateMeetupSchema.validate(req.body)
            if (error) {
                return ApiErrors.badRequest(error.details[0].message)
            }

        const {id} = req.params
        const newName = req.body.name
        const newDescription = req.body.description
        const newTime = req.body.time
        const newPlace = req.body.place
        
        const result = await Meetup.update({name: newName, description: newDescription, time: newTime, place: newPlace}, {where: {id}})
        res.json(result)
    }

    async deleteMeetup(req, res) {
        const {id} = req.params
        const result = await Meetup.destroy({where: {id}})
        return res.json(result)
    }
}

module.exports = new MeetupController()