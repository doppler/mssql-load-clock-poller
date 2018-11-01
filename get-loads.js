const buildSelectClause = require("./build-select-clause");

async function getLoads(sequelize) {
  const selectStr = buildSelectClause({
    LastLoadName: "loadsFlownToday",
    LastLoadTime: "lastLoadTime"
  });

  const query = `SELECT ${selectStr} FROM loads`;

  return sequelize.query(query, { nest: true }).then(rows => {
    return rows[0];
  });
}

module.exports = getLoads;
