const Router = require('express')
const passport = require('passport')
const userController = require('../controllers/userController')

const router = new Router()

router.post('/registration', userController.reqistration)

router.post('/login', userController.login)

router.delete('/logout', passport.authenticate('jwt', {session: false}), userController.logout)

router.post('/refresh',   userController.refresh)

router.get('/me', passport.authenticate('jwt', {session: false}), userController.getUser)

module.exports = router 