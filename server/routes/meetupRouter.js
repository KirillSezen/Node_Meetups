const Router = require('express')
const meetupController = require('../controllers/meetupController')

const router = new Router()

router.get('/', meetupController.getAllMeetups)

router.get('/:id', meetupController.getCurrentMeetup)

router.post('/', meetupController.createMeetup)

router.patch('/:id', meetupController.editMeetup)

router.delete('/:id', meetupController.deleteMeetup)

module.exports = router