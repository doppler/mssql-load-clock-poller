const express = require("express");
const configureSequelize = require("./configure-sequelize");
const allowCrossDomain = require("./allow-cross-domain");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(allowCrossDomain);

// app.all("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
//   next();
// });

app.get("/", (req, res) => {
  res.send("Try /Houston or /Dallas");
});

/*
`app.all('*', function(req, res, next) {
     var origin = req.get('origin');
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});`
*/
app.get("/:locationId", async (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  // res.set("Access-Control-Allow-Credentials", "false");
  // res.set("Access-Control-Allow-Headers", "Content-Type");
  // res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
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
