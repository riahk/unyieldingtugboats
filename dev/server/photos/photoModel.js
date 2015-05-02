var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
	img: { data: Buffer, contentType: String },
	location: {
		x: Number, 
		y: Number
	}, //there are special things for geo spatial things in MongoDB
	tags: Array, 
	info: String, 
	date: { type: Date, default: Date.now }

	//fields
});

module.exports = mongoose.model('Photo', PhotoSchema);