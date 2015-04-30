var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/scavengerhunt'); // connect to mongo database named scavengerhunt

// var Photo = require('./photos/photoModel.js');

// Photo.create({info: 'this is a picture'});

// listen on port 3000
app.listen(3000);

// serves public folder
app.use(express.static('../client/scavengerhunt/www'));