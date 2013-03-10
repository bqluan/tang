goog.provide('fs.FSError');

/**
 * @param {number} errno
 * @param {string} code
 * @param {string} message
 * @constructor
 */
fs.FSError = function(errno, code, message) {
  this.errno = errno;
  this.code = code;
  this.message = message;
}

/**
 * @type {number}
 */
fs.FSError.prototype.errno;

/**
 * @type {string}
 */
fs.FSError.prototype.code;

/**
 * @type {string}
 */
fs.FSError.prototype.message;
