const ApiErrors = require('../error/ApiErrors')
const passport = require('passport')

const isOrganizer = (req, res, next) => {
    if(req.user && req.user.role == 'ORGANIZER') {
        next()
    } else {
        res.json(ApiErrors.forbidden("You're not an organizer"))
    }
}

module.exports = isOrganizer