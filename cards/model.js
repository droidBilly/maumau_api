const Sequelize = require('sequelize')
const sequelize = require('../db')

const Cards = sequelize.define('cards', {
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    suits: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
  tableName: 'cards',
  timestamps: false
})

module.exports = Cards
