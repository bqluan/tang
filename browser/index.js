var express = require('express'),
    path = require('path');

var app = module.exports = express();

app.use(express.static(path.join(__dirname)));
