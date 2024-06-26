const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Meetup = sequelize.define('meetup', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    time: { type: DataTypes.DATE, allowNull: false },
    place: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Meetup;