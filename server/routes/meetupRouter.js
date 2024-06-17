const Router = require('express')
const meetupController = require('../controllers/meetupController')
const isOrganizer = require('../middleware/CheckRoleMiddleware')
const passport = require('passport')

const router = new Router()

router.get('/', meetupController.getAllMeetups)

router.get('/:id', meetupController.getCurrentMeetup)

router.post('/', passport.authenticate('jwt', {session: false}), isOrganizer, meetupController.createMeetup)

router.patch('/:id', passport.authenticate('jwt', {session: false}), isOrganizer, meetupController.editMeetup)

router.delete('/:id', passport.authenticate('jwt', {session: false}), isOrganizer, meetupController.deleteMeetup)

module.exports = router