require("dotenv").config();
const config = {
  Houston: JSON.parse(process.env.Houston),
  Dallas: JSON.parse(process.env.Dallas)
};
const express = require("express");
const configureSequelize = require("./configure-sequelize");
const allowCrossDomain = require("./allow-cross-domain");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(allowCrossDomain);

app.get("/clock/:locationId", async (req, res) => {
  const sequelize = await configureSequelize(req.params.locationId, config);
  const data = await fetchData(sequelize);
  res.json(data).end();
});

app.get("/", (req, res) => {
  const output = ["Houston", "Dallas"]
    .map(location => {
      return `<p><a href="/clock/${location}">${location}</a></p>`;
    })
    .join("");
  res.send(output).end();
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
