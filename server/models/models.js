const Meetup = require('./meetupModel');
const MeetupKeyWord = require('./meetupKeywordModel');
const KeyWord = require('./keywordModel')
const User = require('./userModel');
const sequelize = require('../config/db')

User.hasMany(Meetup, {as: 'Meetups'})
Meetup.belongsTo(User, {foreignKey: 'userId', as: 'ORGANIZER'})

Meetup.belongsToMany(KeyWord, { through: MeetupKeyWord, foreignKey: 'meetupId', otherKey: 'keyWordId' });
KeyWord.belongsToMany(Meetup, { through: MeetupKeyWord, foreignKey: 'keyWordId', otherKey: 'meetupId' });


module.exports = {
    Meetup, 
    KeyWord,
    MeetupKeyWord
}