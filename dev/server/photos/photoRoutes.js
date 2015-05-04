var photoUtils = require('./photoUtils');
var multer = require('multer');
var ExifImage = require('exif').ExifImage;


module.exports = function (app) {
  // app === photoRouter injected from middlware.js

  app.post('/new', multer({  dest: './uploads/',
                     //give file a short id for filename which will be used to id it in database
                    rename: function (fieldname, filename, req, res) {
                      return photoUtils.generateShortId();
                    },
                     //as soon as upload ends, need to extract the exif data and store in the database
                    onFileUploadComplete: function (file, req, res) {
                      new ExifImage({ image : './uploads/' + file.name }, function (error, exifData) {
                          if (error)
                              console.log('Error: '+error.message);
                          else {
                            //generate gps object
                            var gpsDMS = {
                              GPSLatitudeRef: exifData.gps.GPSLatitudeRef,
                              GPSLatitude: exifData.gps.GPSLatitude,
                              GPSLongitudeRef: exifData.gps.GPSLongitudeRef,
                              GPSLongitude: exifData.gps.GPSLongitude
                            }

                            var gps = photoUtils.makeDecDeg(gpsDMS);
                            console.log("decimal degrees: ", gps);
                            photoUtils.addPhotoToDb(file.name, gps)//add to database
                          }
                      });
                    }
                  }));

  app.post('/new', photoUtils.fns);
  app.get('/', photoUtils.fns);

};