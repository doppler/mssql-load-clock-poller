const Sequelize = require("sequelize");
const config = require("./config.json")["Houston"];

const configureSequelize = locationId => {
  const config = require("./config.json")[locationId];

  return new Sequelize({
    username: config.userName,
    password: config.password,
    host: config.server,
    logging: false,
    operatorsAliases: false,
    dialect: "mssql",
    dialectOptions: {
      encrypt: false
    }
  });
};

module.exports = configureSequelize;
