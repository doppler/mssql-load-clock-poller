const Sequelize = require("sequelize");
const config = require("./config.json")["Houston"];

const sequelize = new Sequelize({
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

module.exports = sequelize;
