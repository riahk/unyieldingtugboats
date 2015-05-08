//Photo Model Setup
//-----------------

var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	_id: {
	    type: String,
	    unique: true,
	},
	loc: {
		//[lng, lat]
		type: [Number],  
		//create the geospatial index
		index: '2d' 
	}, 
	//orientation of the photo from exif data
	orientation: Number,
	tags: Array,
	info: String, 
	date: { type: Date, default: Date.now }

});

var Photo = mongoose.model('Photo', PhotoSchema);

Photo.ensureIndexes(function(err) {
	if (err) return;
	else console.log('index created');
})

module.exports = Photo;

