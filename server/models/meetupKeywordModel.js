const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const MeetupKeyWord = sequelize.define('meetup_key_word', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

module.exports = MeetupKeyWord;