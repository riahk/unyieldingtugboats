var mongoose = require('mongoose');

// Hunt Database Schema
// --------------------

var HuntSchema = new mongoose.Schema({
  cover: String,
	photos: Array,
	info: String, 
	tags: Array, 
	region: Number //geo spatial data? 
	//fields
});

module.exports = mongoose.model('Hunt', HuntSchema);