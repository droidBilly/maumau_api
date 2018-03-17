const Sequelize = require("sequelize");
const sequelize = require("../db");

const Card = sequelize.define(
  "card",
  {
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    suits: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: "cards",
    timestamps: false
  }
);

module.exports = Card;
