const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Meetup = sequelize.define('meetup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    keyWords: {type: DataTypes.ARRAY(DataTypes.STRING)},
    time: {type: DataTypes.DATE, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {
    Meetup
}