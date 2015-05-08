var bodyParser  = require('body-parser');

module.exports = function (app, express) {

  var huntRouter = express.Router();
  var photoRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Enable localhost to localhost connections (CORS)
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, content-type, accept");
    next();
  });

  app.use('/api/hunts', huntRouter); // use hunt router for all user request
  app.use('/api/photos', photoRouter); // user photo router for link request

  // inject our routers into their respective route files
  require('../hunts/huntRoutes.js')(huntRouter);
  require('../photos/photoRoutes.js')(photoRouter);
};
