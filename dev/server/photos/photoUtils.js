var shortid = require('shortid');
var Photo = require('./photoModel');



module.exports = {
	generateShortId : function () {
		return shortid.generate();
	},

	convertDMStoDeg: function(dmsArray){
		console.log('convertDMStoDeg called with: ', dmsArray);
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

		return {
			lat: lat.toFixed(3),
			lng: lng.toFixed(3)
		}
	},

	addPhotoToDb : function(filename, gps){
		console.log("to add to database: ", filename.substring(0, filename.indexOf('.')), ' ', gps);
		Photo.create({
			_id: filename.substring(0, filename.indexOf('.')),
			gps: gps
		});
	},

	fns: function(req, res){
		console.log('fns');
		res.writeHead(300);
		res.end('you uploaded a photo'); 
	}
}

