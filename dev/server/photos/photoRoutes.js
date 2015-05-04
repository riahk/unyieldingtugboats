var photoUtils = require('./photoUtils');
var multer = require('multer');
var ExifImage = require('exif').ExifImage;


module.exports = function (app) {
  // app === photoRouter injected from middlware.js

  app.post('/new', multer({  dest: './uploads/',
                    //give file a short id for filename which will be also be used in _id field in database
                    rename: function (fieldname, filename, req, res) {
                      return photoUtils.generateShortId();
                    },
                    //as soon as the upload is complete, need to extract the exif data and store in the database
                  	//the extracted exif data has gps info in DMS and the google maps API needs gps info 
                  	//in decimal degrees. This fn first compiles a gpsDMS object which is passed into conversion
                  	//helper functions, and the resulting gps object with lat and lng properties in decimal degrees is
                  	//passed to the addPhotoToDb helper function.
                    onFileUploadComplete: function (file, req, res) {
                     console.log('onFileUploadComplete');
                      new ExifImage({ image : './uploads/' + file.name }, function (error, exifData) {
                          if (error)
                              console.log('Error: '+error.message);
                          else {
                            var gpsDMS = {
                              GPSLatitudeRef: exifData.gps.GPSLatitudeRef,
                              GPSLatitude: exifData.gps.GPSLatitude,
                              GPSLongitudeRef: exifData.gps.GPSLongitudeRef,
                              GPSLongitude: exifData.gps.GPSLongitude
                            }

                            var gps = photoUtils.makeDecDeg(gpsDMS);
                            photoUtils.addPhotoToDb(file.name, gps, req.body)//add to database
                          }
                      });
                    }
                  }), photoUtils.fns);

	//a get request returns photos. if its a vanilla get request without a zipcode specified,
	//then it returns the most recent photos (20?).  If a zipcode is first specified through a post 
	//request, then it returns the photos from within that zipcode (box)

  app.post('/', function(req, res){
		photoUtils.getZipGPS(req.body.zipcode, req, res); 
  });


	app.get('/', function(req, res, next){
		var zipLoc = {
	                   "lat" : 37.2638319,
	                   "lng" : -122.023004
	                };
		photoUtils.fetchPhotosByLoc(zipLoc, req, res, next);
	});

};