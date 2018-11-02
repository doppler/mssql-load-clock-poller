const Sequelize = require("sequelize");

module.exports = async (locationId, c) => {
  const config = c[locationId];
  if (!config) {
    return null;
  }
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
