//Zipcode Model Setup
//--------------------
var mongoose = require('mongoose');

var ZipcodeSchema = new mongoose.Schema({
	zipcode: {
		type: Number,
		unique: true
	},
	loc: {
		lat: Number,
		lng: Number
	}, 
});

module.exports = mongoose.model('Zipcode', ZipcodeSchema);

