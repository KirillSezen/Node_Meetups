const Meetup = require('./meetupModel');
const MeetupKeyWord = require('./meetupKeywordModel');
const KeyWord = require('./keywordModel')

Meetup.belongsToMany(KeyWord, { through: MeetupKeyWord });
KeyWord.belongsToMany(Meetup, { through: MeetupKeyWord });

module.exports = {
    Meetup, 
    KeyWord,
    MeetupKeyWord
}