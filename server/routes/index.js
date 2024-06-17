const Router = require('express')
const meetupRouter = require('./meetupRouter')
const userRouter = require('./userRouter')
const keywordRouter = require('./keywordRouter')

const router = new Router()

router.use('/meetup', meetupRouter)
router.use('/user', userRouter)
router.use('/keyword', keywordRouter)

module.exports = router