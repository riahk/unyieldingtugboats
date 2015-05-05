var mongoose = require('mongoose');

// Hunt Database Schema
// --------------------

var HuntSchema = new mongoose.Schema({
	photos: Array,
	info: String, 
	tags: Array, 
	region: Number //geo spatial data? 
	//fields
});

module.exports = mongoose.model('Hunt', HuntSchema);