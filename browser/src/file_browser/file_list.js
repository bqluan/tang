goog.provide('filebrowser.FileList');

goog.require('filebrowser.FileListRenderer');
goog.require('goog.ui.Container');

/**
 * @param {string} path
 * @param {filebrowser.FileListRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 */
filebrowser.FileList = function(path, opt_renderer, opt_domHelper) {
  goog.ui.Container.call(
    this,
    goog.ui.Container.Orientation.HORIZONTAL,
    opt_renderer || filebrowser.FileListRenderer.getInstance(),
    opt_domHelper);
  this.path_ = path || '/';
};
goog.inherits(filebrowser.FileList, goog.ui.Container);

/**
 * @type {string}
 * @private
 */
filebrowser.FileList.prototype.path_ = null;

/**
 * @param {string} path
 */
filebrowser.FileList.prototype.setPath = function(path) {
  this.path_ = path;
};

/**
 * @return {string}
 */
filebrowser.FileList.prototype.getPath = function() {
  return this.path_;
};
