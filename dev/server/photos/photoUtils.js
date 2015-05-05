var shortid = require('shortid');
var Photo = require('./photoModel');
var rp = require('request-promise');
var multer = require('multer');
var ExifImage = require('exif').ExifImage;



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
	getZipGPS: function(zipcode, req, res, next) {
		fetchPhotosByLoc = this.fetchPhotosByLoc; 
		rp('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode).then(function(body){
			var result = JSON.parse(body);
	    lat = result.results[0].geometry.location.lat;
	    lng = result.results[0].geometry.location.lng;
			var zipLoc = {
	                   "lat" : lat,
	             			 "lng" : lng
			              };
		  fetchPhotosByLoc(zipLoc, req, res, next);
		});
	},

	fetchPhotosByLoc: function(zipLoc, req, res, next) {
		var limit = 30; 
		//set max distance to 10km and convert it to radians
		//radius of earth is appx 6371km
		var maxDistance = .059;
		console.log('max distance: ', maxDistance);

		var zipCoords = []; 
		zipCoords.push(zipLoc.lng); 
		zipCoords.push(zipLoc.lat);

		console.log("zipCoords: ", zipCoords);

		Photo.find({
			loc: {
				$near: zipCoords,
				$maxDistance: maxDistance
			}
		}).limit(limit).exec(function(err, photos) {
			if (err) {
				return res.status(500).json(err);
			}
			console.log('photos: ', photos);
			res.status(200).json(photos);
		})
	},

	fetchPhotosByDate: function(req, res, next) {
		var limit = 30; 
		Photo.find({}).limit(limit).sort({date: -1}).exec(function(err, photos) {
			if (err) {
				return res.status(500).json(err);
			}
			console.log('photos: ', photos);
			res.status(200).json(photos);
		});
	},

	fns: function(req, res){
		res.writeHead(300);
		res.end('you uploaded a photo'); 
	}
}

