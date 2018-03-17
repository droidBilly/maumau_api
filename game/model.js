const Sequelize = require("sequelize");
const sequelize = require("../db");

const Game = sequelize.define(
  "game",
  {
    stack: {
      type: Sequelize.JSON,
      allowNull: true
    },
    played: {
      type: Sequelize.JSON,
      allowNull: true
    },
    active: {
      type: Sequelize.JSON,
      allowNull: true
    },
    player1: {
      type: Sequelize.JSON,
      allowNull: true
    },
    player2: {
      type: Sequelize.JSON,
      allowNull: true
    },
  },
  {
    tableName: "game",
    timestamps: false
  }
);

module.exports = Game;
