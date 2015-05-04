var shortid = require('shortid');
var Photo = require('./photoModel');
var gm = require('googlemaps');



module.exports = {
	generateShortId : function () {
		return shortid.generate();
	},

	convertDMStoDeg: function(dmsArray){
		var deg = dmsArray[0];
		var min = dmsArray[1];
		var sec = dmsArray[2];

		return deg + (((min * 60) + sec)/3600);
	},

	makeDecDeg: function(gps){
		var lat = this.convertDMStoDeg(gps.GPSLatitude);
		if (gps.GPSLatitudeRef === 'S'){
			lat *= -1;
		}
		var lng = this.convertDMStoDeg(gps.GPSLongitude);
		if (gps.GPSLongitudeRef === 'W'){
			lng *= -1; 
		}

		return [ lng.toFixed(6), lat.toFixed(6) ];
	},

	addPhotoToDb : function(filename, gps, reqBody){
		console.log('addPhotoToDb');
		var tags = reqBody.tags.split(',');
		var info = reqBody.info;
		Photo.create({
			_id: filename.substring(0, filename.indexOf('.')),
			loc: gps,
			tags: tags,
			info: info
		}, function(error) {
			if (error) {
				console.log ('error');
			}
		});
	},

	//this function will turn the zipcode on the request body
	//into a json object and pass that object to get '/'
	getZipGPS: function(zipcode, req, res) {
		console.log('getting Zip GPS with: ', zipcode);
		console.log(req);
	},

	redirectToGetPhotos: function(req, res){
		console.log('redirect to get photos');
	},

	fetchPhotosByLoc: function(bounds) {
		var query = Photo.find({})
											.where('gps.lng').gt((bounds.southwest.lng).toString()) //.lt((bounds.northeast.lng).toString());
											.where('gps.lat').gt((bounds.southwest.lat).toString()) //.lt((bounds.northeast.lat).toString());
		console.log('query: ', query);

		query.exec(function(err, photos){
			console.log('here are the photos: ', photos);
		})

	},

/*
	"bounds" : {
	               "northeast" : {
	                  "lat" : 37.299909,
	                  "lng" : -121.980608
	               },
	               "southwest" : {
	                  "lat" : 37.2079899,
	                  "lng" : -122.12229
	               }
	            },
*/

	fns: function(req, res){
		res.writeHead(300);
		res.end('you uploaded a photo'); 
	}
}

