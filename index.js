var express = require('express');

var app = module.exports = express();

app.use('/fs', require('./file_service'));

if (!module.parent) {
  app.listen(1337);
  console.log('Server started on port 1337');
}
