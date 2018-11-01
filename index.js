const sequelize = require("./sequelize");

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
