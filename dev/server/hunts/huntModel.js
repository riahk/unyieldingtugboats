var mongoose = require('mongoose');

var HuntSchema = new mongoose.Schema({
	photos: Array; 
	info: String; 
	tags: Array; 
	region: Number //geo spatial data? 
	//fields
});

module.exports = mongoose.model('Hunt', HuntSchema);