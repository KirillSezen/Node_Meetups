const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const KeyWord = sequelize.define('key_word', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: DataTypes.STRING, allowNull: false }
});

module.exports = KeyWord;