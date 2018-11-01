module.exports = obj => {
  return Object.keys(obj)
    .map(key => `${key} AS "${obj[key]}"`)
    .join(", ");
};
