const Sequelize = require("sequelize");
const config = require("./config.json")["Dallas"];

const sequelize = new Sequelize({
  username: config.userName,
  password: config.password,
  host: config.server,
  dialect: "mssql",
  dialectOptions: {
    encrypt: false
  }
});

const queryObj = {
  Direction: "winds.direction",
  CurrentSpeed: "winds.speed",
  h5: "winds.high_5min",
  h10: "winds.high_10min",
  h20: "winds.high_20min",
  Temp: "weather.temp",
  HeatIndex: "weather.heatIndex",
  Date: "lastUpdate"
};

const selectStr = Object.keys(queryObj)
  .map(key => {
    return `${key} as "${queryObj[key]}"`;
  })
  .join(", ");

const query = `SELECT ${selectStr} FROM wind_summary`;

sequelize
  .query(query, {
    nest: true
  })
  .then(rows => {
    console.log(JSON.stringify(rows, undefined, 2));
  });
