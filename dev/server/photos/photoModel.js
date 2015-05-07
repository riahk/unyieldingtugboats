var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	_id: {
	    type: String,
	    unique: true,
	    // 'default': shortid.generate
	},
	loc: {
		type: [Number],  //[lng, lat]
		index: '2d' //create the geospatial index
	}, 
	orientation: Number,
	tags: Array,
	info: String, 
	date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Photo', PhotoSchema);

