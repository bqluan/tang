var app = require('../../file_service'),
    fs = require('fs'),
    path_ = require('path'),
    request = require('request');

var uriPrefix = 'http://127.0.0.1:1337';
var mount = path_.join(__dirname, '../../disk');

var World = exports.World = function(done) {
  done();
};

World.prototype.startServer = function(done) {
  this.server = app.listen(1337);
  done();
};

World.prototype.stopServer = function(done) {
  this.server.close(done);
};

World.prototype.get = function(file, done) {
  var self = this;
  request.get(uriPrefix + file, function(err, res, body) {
    self.err = err;
    self.res = res;
    self.body = body;
    done();
  });
};

World.prototype.head = function(file, done) {
  var self = this;
  request.head(uriPrefix + file, function(err, res, body) {
    self.err = err;
    self.res = res;
    self.body = body;
    done();
  });
};

World.prototype.writeFile = function(filename, data, done) {
  fs.writeFile(path_.join(mount, filename), data, function(err) {
    err ? done.fail(err) : done();
  });
};

World.prototype.rm = function(filename, done) {
  fs.unlink(path_.join(mount, filename), function(err) {
    err ? done.fail(err) : done();
  });
};

World.prototype.rmF = function(filename, done) {
  var self = this;
  fs.exists(path_.join(mount, filename), function(exists) {
    exists ? self.rm(filename, done) : done();
  });
};
