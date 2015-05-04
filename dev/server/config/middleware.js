var bodyParser  = require('body-parser');

module.exports = function (app, express) {

  var huntRouter = express.Router();
  var photoRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  

  app.use('/api/hunts', huntRouter); // use hunt router for all user request
  app.use('/api/photos', photoRouter); // user photo router for link request

  // inject our routers into their respective route files
  require('../hunts/huntRoutes.js')(huntRouter);
  require('../photos/photoRoutes.js')(photoRouter);
};
