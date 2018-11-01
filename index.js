const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const parse = require("date-fns/parse");

const config = require("./config.json");

const connection = new Connection(config["Dallas"]);

connection.on("connect", err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  setInterval(() => {
    executeStatement(`SELECT * FROM wind_summary`);
  }, 1000);
});

connection.on("end", () => {
  console.info("Connection closed");
  process.exit(0);
});

const executeStatement = query => {
  const request = new Request(query, (err, rowCount) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`${rowCount} rows`);
    }
  });

  request.on("row", columns => {
    const row = {};
    columns.map(column => {
      row[column.metadata.colName] = column.value;
    });
    console.log(JSON.stringify(formatRow(row), undefined, 2));
  });

  request.on("done", (rowCount, more) => {
    console.log(`${rowCount} returned`);
  });
  connection.execSql(request);
};

const formatRow = row => {
  const winds = {
    direction: row.Direction,
    speed: row.CurrentSpeed,
    high_5min: row.h5,
    high_10min: row.h10,
    high_20min: row.h20
  };
  const weather = {
    temp: row.Temp,
    heatIndex: row.HeatIndex
  };
  return {
    winds,
    weather,
    lastUpdate: parse(row.Date)
  };
};
