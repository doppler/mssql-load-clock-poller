const buildSelectClause = require("./build-select-clause");

module.exports = async sequelize => {
  const selectStr = buildSelectClause({
    LastLoadName: "loadsFlownToday",
    LastLoadTime: "lastLoadTime"
  });

  const query = `SELECT ${selectStr} FROM loads`;

  return sequelize.query(query, { nest: true }).then(rows => {
    return rows[0];
  });
};
