require('dotenv').config()
require('./passport')

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const initDatabase = require('./dbInitialization')
const passport = require('passport')

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(passport.initialize())

app.use(errorHandler)

const start = async () => {
    try {
        initDatabase()
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()