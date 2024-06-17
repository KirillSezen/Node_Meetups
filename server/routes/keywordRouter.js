const Router = require('express')
const keywordController = require('../controllers/keywordController')
const isOrganizer = require('../middleware/CheckRoleMiddleware')
const passport = require('passport')

const router = new Router()

router.get('/', keywordController.getAllKeyWords)

router.post('/', passport.authenticate('jwt', {session: false}), isOrganizer,  keywordController.createKeyWord)

router.patch('/:id', passport.authenticate('jwt', {session: false}), isOrganizer, keywordController.editKeyWord)

router.delete('/:id', passport.authenticate('jwt', {session: false}), isOrganizer, keywordController.deleteKeyWord)

router.post('/:id', passport.authenticate('jwt', {session: false}), isOrganizer, keywordController.addKeyWord)

module.exports = router