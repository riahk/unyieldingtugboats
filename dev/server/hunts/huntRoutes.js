var huntUtils = require('./huntUtils')

module.exports = function (app) {
  // app === huntRouter injected from middlware.js

  app.post('/new', huntUtils.fns);
  app.get('/', huntUtils.fns);

};