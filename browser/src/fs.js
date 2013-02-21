goog.provide('fs');

goog.require('goog.net.IframeIo');
goog.require('goog.net.XhrIo');

/**
 * @constructor
 */
fs.Stats = function(res) {
  this.size = res.getResponseHeader('x-stats-size');
  this.mtime = res.getResponseHeader('x-stats-mtime');
  this.mode = parseInt(res.getResponseHeader('x-stats-mode'));
};

fs.Stats.prototype.isFile = function() {
  return (0xF000 & this.mode) === 0x8000;
};

fs.Stats.prototype.isDirectory = function() {
  return (0xF000 & this.mode) === 0x4000;
};

fs.readdir = function(path, callback) {
  goog.net.XhrIo.send(getUri(path), function(e) {
    var res = e.target;
    if (!res.isSuccess()) {
      return callback(reserror(res));
    }
    var stats = new fs.Stats(res);
    if (!stats.isDirectory()) {
      return callback(new FSError(27, 'ENOTDIR', 'not a directory'));
    }
    callback(null, res.getResponseJson());
  });
};

fs.lstat = function(path, callback) {
  goog.net.XhrIo.send(getUri(path), function(e) {
    var res = e.target;
    res.isSuccess() ? callback(null, new fs.Stats(res)) : callback(reserror(res));
  }, 'HEAD');
};

fs.download = function(filename, callback) {
  goog.net.IframeIo.send(getUri(filename), function(e) {
    var res = e.target;
    res.isSuccess() ? callback() : callback(reserror(res));
  });
};

function getUri(path) {
  return '/fs' + path;
}

/**
 * @constructor
 */
function FSError(errno, code, message) {
  this.errno = errno;
  this.code = code;
  this.message = message;
}

function reserror(res) {
  return new FSError(
    parstInt(res.getResponseHeader('x-error-errno')) || res.getStatus(),
    res.getResponseHeader('x-error-code') || res.getStatus(),
    res.getResponseText());
}
