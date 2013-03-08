goog.provide('fs.Stats');
goog.provide('fs.Stats.Mode');

/**
 * @param {number} mode
 * @param {number} size
 * @param {Date} mtime
 * @constructor
 */
fs.Stats = function(mode, size, mtime) {
  this.mode_ = mode || fs.Stats.Mode.REGULAR_FILE;
  this.size_ = size || 0;
  this.mtime_ = mtime || new Date();
};

/**
 * @enum {number}
 */
fs.Stats.Mode = {
  REGULAR_FILE: 0x8000,
  DIRECTORY: 0x4000
};

/**
 * @type {number}
 * @private
 */
fs.Stats.prototype.size_;

/**
 * @type {Date}
 * @private
 */
fs.Stats.prototype.mtime_;

/**
 * @type {number}
 * @private
 */
fs.Stats.prototype.mode_;

/**
 * @return {number}
 */
fs.Stats.prototype.getSize = function() {
  return this.size_;
};

/**
 * @return {number}
 */
fs.Stats.prototype.getMode = function() {
  return this.mode_;
};

/**
 * @return {Date}
 */
fs.Stats.prototype.getMTime = function() {
  return this.mtime_;
};

/**
 * @return {boolean}
 */
fs.Stats.prototype.isFile = function() {
  return (0xF000 & this.mode_) === fs.Stats.Mode.REGULAR_FILE;
};

/**
 * @return {boolean}
 */
fs.Stats.prototype.isDirectory = function() {
  return (0xF000 & this.mode_) === fs.Stats.Mode.DIRECTORY;
};
