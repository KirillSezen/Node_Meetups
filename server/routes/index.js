const Router = require('express')
const meetupRouter = require('./meetupRouter')

const router = new Router()

router.use('/meetup', meetupRouter)

module.exports = router