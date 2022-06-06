const path = require('path');

// Create path to public folder (dynamic for all platforms)
const createPath = (page) =>
  path.resolve(__dirname, '../ejs-views', `${page}.ejs`);

module.exports = createPath;
