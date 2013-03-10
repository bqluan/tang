goog.provide('filebrowser.FileList');

goog.require('filebrowser.FileListRenderer');
goog.require('goog.ui.Container');

/**
 * @param {filebrowser.FileListRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 */
filebrowser.FileList = function(opt_renderer, opt_domHelper) {
  goog.ui.Container.call(
    this,
    goog.ui.Container.Orientation.HORIZONTAL,
    opt_renderer || filebrowser.FileListRenderer.getInstance(),
    opt_domHelper);
};
goog.inherits(filebrowser.FileList, goog.ui.Container);
