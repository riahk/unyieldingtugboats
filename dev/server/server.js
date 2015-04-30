var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// listen on port 3000
app.listen(3000);

// serves public folder
app.use(express.static('../client/scavengerhunt/www'));