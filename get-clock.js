const buildSelectClause = require("./build-select-clause");

async function getClock(sequelize) {
  const selectStr = buildSelectClause({
    Enabled: "enabled",
    Running: "running",
    Name: "load",
    WeatherHold: "hold",
    ForegroundColor: "foregroundColor",
    BackgroundColor: "backgroundColor",
    SlotsRemaining: "slots",
    CounterExpires: "expire_datetime"
  });

  const query = `SELECT ${selectStr} from clock`;

  return sequelize.query(query, { nest: true });
}

module.exports = getClock;
