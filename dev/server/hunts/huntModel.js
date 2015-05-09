var mongoose = require('mongoose');

// Hunt Database Schema
// --------------------

var HuntSchema = new mongoose.Schema({
  cover: Object,
	photos: Array,
	info: String, 
	tags: Array, 
	region: Number,
	date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Hunt', HuntSchema);