var photoUtils = require('./photoUtils')

module.exports = function (app) {
  // app === photoRouter injected from middlware.js

  app.post('/new', photoUtils.fns);
  app.get('/', photoUtils.fns);

};