goog.provide('path');

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

/**
 * @param {string} filename
 * @return {Array.<string>}
 */
function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

/**
 * @param {Array.<string>} parts
 * @param {boolean} allowAboveRoot
 * @return {Array.<string>}
 */
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

/**
 * @param {string} filename
 * @param {string=} ext
 * @return {string}
 */
path.basename = function(filename, ext) {
  var f = splitPath(filename)[2];
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

/**
 * @param {string} filename
 * @return {string}
 */
path.normalize = function(filename) {
  var isAbsolute = filename.charAt(0) === '/',
      trailingSlash = filename.substr(-1) === '/';

  // Normalize the path
  filename = normalizeArray(filename.split('/').filter(function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!filename && !isAbsolute) {
    filename = '.';
  }
  if (filename && trailingSlash) {
    filename += '/';
  }

  return (isAbsolute ? '/' : '') + filename;
};

/**
 * @param {...string} var_args
 * @return {string}
 */
path.join = function(var_args) {
  var paths = Array.prototype.slice.call(arguments, 0);
  return path.normalize(paths.join('/'));
};
