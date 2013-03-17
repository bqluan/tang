goog.provide('fs');

goog.require('fs.FSError');
goog.require('fs.Stats');
goog.require('goog.events');
goog.require('goog.net.IframeIo');
goog.require('goog.net.XhrIo');

/**
 * @param {string} filename
 * @return {string}
 */
function getUri(filename) {
  return '/fs' + filename;
}

/**
 * @param {goog.net.XhrIo}
 * @return {fs.FSError}
 */
function newFSError(res) {
  return new fs.FSError(
    parseInt(res.getResponseHeader('x-error-errno')),
    res.getResponseHeader('x-error-code'),
    res.getResponseText());
}

/**
 * @param {goog.net.XhrIo}
 * @return {fs.Stats}
 */
function newStats(res) {
  return new fs.Stats(
    parseInt(res.getResponseHeader('x-stats-mode')),
    res.getResponseHeader('x-stats-size'),
    res.getResponseHeader('x-stats-mtime'));
};

/**
 * @param {string} dirname
 * @param {Function} callback
 */
fs.readdir = function(dirname, callback) {
  goog.net.XhrIo.send(
    getUri(dirname),
    /**
     * @param {goog.events.Event} e
     */
    function(e) {
      /** @type {goog.net.XhrIo} */
      var res = e.target;
      if (!res.isSuccess()) {
        return callback(newFSError(res));
      }
      var stats = newStats(res);
      if (!stats.isDirectory()) {
        return callback(new fs.FSError(27, 'ENOTDIR', 'not a directory'));
      }
      callback(null, res.getResponseJson());
    });
};

/**
 * @param {string} filename
 * @param {Function} callback
 */
fs.lstat = function(filename, callback) {
  goog.net.XhrIo.send(
    getUri(filename),
    /**
     * @param {goog.events.Event} e
     */
    function(e) {
      /** @type {goog.net.XhrIo} */
      var res = e.target;
      res.isSuccess() ?
        callback(null, newStats(res)) :
        callback(newFSError(res));
    },
    'HEAD');
};

/**
 * @param {string} filename
 * @param {Function} callback
 */
fs.download = function(filename, callback) {
  goog.net.IframeIo.send(
    getUri(filename),
    /**
     * @param {goog.events.Event} e
     */
    function(e) {
      /** @type {goog.net.IframeIo} */
      var res = e.target;
      res.isSuccess() ? callback() : callback(newFSError(res));
    });
};

/**
 * @param {string} filename
 * @param {Function} callback
 */
fs.unlink = function(filename, callback) {
  goog.net.XhrIo.send(
    getUri(filename),
    /**
     * @param {goog.events.Event} e
     */
    function(e) {
      /** @type {goog.net.XhrIo} */
      var res = e.target;
      res.isSuccess() ?
        callback(null, newStats(res)) :
        callback(newFSError(res));
    },
    'DELETE');
};

/**
 * @param {string} dirname
 * @param {HTMLFormElement} form
 * @param {Function} callback
 */
fs.upload = function(dirname, form, callback) {
  var io = new goog.net.IframeIo();
  goog.events.listen(
    io,
    goog.net.EventType.COMPLETE,
    /**
     * @param {goog.events.Event} e
     */
    function(e) {
      /** @type {goog.net.IframeIo} */
      var res = e.target;
      res.isSuccess() ? callback() : callback(newFSError(res));
    });
  io.sendFromForm(form, getUri(dirname));
};
