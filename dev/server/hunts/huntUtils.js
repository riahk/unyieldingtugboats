var Hunts = require('./huntModel');

module.exports = {

  // Hunt Helper Functions
  // ---------------------

  // get list of hunts, limit 10
  getHunts: function(req, res, next) {
    Hunts.find()
         .limit(10)
         .exec(function(err, results) { 
            if (err) {
              console.log('Error fetching from Hunts DB');
              next(err);
            } else {
              res.queryResults = JSON.stringify(results);
              next();
            }
          });
  },

  // add hunt to database
  addHunt: function(req, res, next) {
    console.log(req.body);
     Hunts.create(req.body, function(err) {
       if (err) {
         console.log('Error fetching from Hunts DB');
         next(err);
       } else {
         console.log('hunt was added');
         next();
       }
    });
  },

  // end request with proper code and data
  fns: function(req, res){

    if (res.queryResults) {

      res.writeHead(200);
      res.end(res.queryResults);

    } else {

      res.writeHead(201);
      res.end('Successfully added your hunt');

    }

  }
}
