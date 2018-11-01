const express = require("express");
const configureSequelize = require("./configure-sequelize");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Try /Houston or /Dallas");
});

app.get("/:locationId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const sequelize = await configureSequelize(req.params.locationId);
  const data = await fetchData(sequelize);
  res.json(data);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

const getWeather = require("./get-weather");
const getClock = require("./get-clock");
const getLoads = require("./get-loads");

async function fetchData(sequelize) {
  const weather = await getWeather(sequelize);
  const clock = await getClock(sequelize);
  const loads = await getLoads(sequelize);

  return {
    timers: clock.filter(c => c.enabled),
    winds: weather.winds,
    weather: weather.weather,
    loadsFlownToday: Number(loads.loadsFlownToday),
    lastUpdate: weather.lastUpdate,
    prevWindDirections: []
  };
}
