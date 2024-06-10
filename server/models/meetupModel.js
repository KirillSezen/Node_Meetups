const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Meetup = sequelize.define('meetup', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    time: { type: DataTypes.DATE, allowNull: false },
    place: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Meetup;