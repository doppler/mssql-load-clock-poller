require("dotenv").config();

const Sequelize = require("sequelize");

const configureSequelize = locationId => {
  const config = JSON.parse(process.env[locationId]);

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
