goog.provide('filebrowser.File');

goog.require('filebrowser.FileRenderer');
goog.require('fs.Stats');
goog.require('goog.ui.Control');

/**
 * @param {string} filename
 * @param {fs.Stats} stats
 * @param {filebrowser.FileRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 */
filebrowser.File = function(filename, stats, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
    this,
    filename,
    opt_renderer || filebrowser.FileRenderer.getInstance(),
    opt_domHelper);
  this.filename_ = filename;
  this.stats_ = stats;
};
goog.inherits(filebrowser.File, goog.ui.Control);

/**
 * @type {string}
 * @private
 */
filebrowser.File.prototype.filename_;

/**
 * @type {fs.Stats}
 * @private
 */
filebrowser.File.prototype.stats_;

/**
 * @return {string}
 */
filebrowser.File.prototype.getFilename = function() {
  return this.filename_;
};

/**
 * @return {fs.Stats}
 */
filebrowser.File.prototype.getStats = function() {
  return this.stats_;
};
