const Sequelize = require("sequelize");
const config = require("./config.json")["Houston"];

const sequelize = new Sequelize({
  username: config.userName,
  password: config.password,
  host: config.server,
  dialect: "mssql",
  dialectOptions: {
    encrypt: false
  }
});

const getWinds = require("./get-winds");
const getClock = require("./get-clock");

async function fetchData() {
  const winds = await getWinds(sequelize);
  const clock = await getClock(sequelize);
  console.log(winds);
  console.log(clock);
  process.exit(0);
}
fetchData();
