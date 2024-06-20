require('dotenv').config()
require('./config/passport')
require('./config/swagger')

const express = require('express')
const sequelize = require('./config/db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const initDatabase = require('./config/dbInitialization')
const passport = require('passport')
const { DEFAULT_PORT } = require('./config/constants')
const serveSwaggerUI = require('./config/swagger')
const swaggerui = require('swagger-ui-express')

const PORT = process.env.PORT || DEFAULT_PORT;

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerui.serve, serveSwaggerUI)
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