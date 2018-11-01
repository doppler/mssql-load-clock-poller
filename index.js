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

const getWeather = require("./get-weather");
const getClock = require("./get-clock");
const getLoads = require("./get-loads");

async function fetchData() {
  const weather = await getWeather(sequelize);
  const clock = await getClock(sequelize);
  const loads = await getLoads(sequelize);

  const output = {
    timers: clock.filter(c => c.enabled),
    winds: weather.winds,
    weather: weather.weather,
    loadsFlownToday: Number(loads.loadsFlownToday),
    lastUpdate: weather.lastUpdate
  };
  console.log(output);
  process.exit(0);
}
fetchData();
