const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentPage: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
})

module.exports = Book