const buildSelectClause = require("./build-select-clause");

async function getWinds(sequelize) {
  const selectStr = buildSelectClause({
    Direction: "winds.direction",
    CurrentSpeed: "winds.speed",
    h5: "winds.high_5min",
    h10: "winds.high_10min",
    h20: "winds.high_20min",
    Temp: "weather.temp",
    HeatIndex: "weather.heatIndex",
    Date: "lastUpdate"
  });

  const query = `SELECT ${selectStr} FROM wind_summary`;

  return sequelize
    .query(query, {
      nest: true
    })
    .then(rows => {
      return rows[0];
    });
}
module.exports = getWinds;
