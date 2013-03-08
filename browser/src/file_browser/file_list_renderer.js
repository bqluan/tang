goog.provide('filebrowser.FileListRenderer');

goog.require('goog.ui.ContainerRenderer');

/**
 * @constructor
 */
filebrowser.FileListRenderer = function() {
  goog.ui.ContainerRenderer.call(this);
};
goog.inherits(filebrowser.FileListRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(filebrowser.FileListRenderer);

/**
 * @type {string}
 */
filebrowser.FileListRenderer.CSS_CLASS = goog.getCssName('fb-fl');

/**
 * @return {string}
 */
filebrowser.FileListRenderer.prototype.getCssClass = function() {
  return filebrowser.FileListRenderer.CSS_CLASS;
};
