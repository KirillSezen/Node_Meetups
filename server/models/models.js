const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Meetup = sequelize.define('meetup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    time: {type: DataTypes.DATE, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false}
})

const KeyWord = sequelize.define('key_word', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    word: {type: DataTypes.STRING, allowNull: false},
})

const MeetupKeyWord = sequelize.define('meetup_key_word', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Meetup.belongsToMany(KeyWord, {through: MeetupKeyWord})
KeyWord.belongsToMany(Meetup, {through: MeetupKeyWord})

module.exports = {
    Meetup,
    KeyWord,
    MeetupKeyWord
}