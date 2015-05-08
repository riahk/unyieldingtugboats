var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');


var app = express();

//connect to database
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/scavengerhunt';
mongoose.connect(mongoURI);

//include route middleware
require('./config/middleware.js')(app, express);

// listen on port 3000
var port = process.env.PORT || 3000; 

app.listen(port);

// serves public folder
app.use(express.static('../client/scavengerhunt/www'));