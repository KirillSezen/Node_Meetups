const sequelize = require('./db');
const models = require('./models/models');

const initDatabase = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("succesfull connection to database")
    } catch(e) {
        console.log(e)
    }
}

module.exports = initDatabase