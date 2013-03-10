goog.provide('filebrowser.ForwardButtonRenderer');

goog.require('goog.ui.ButtonRenderer');

/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
filebrowser.ForwardButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(filebrowser.ForwardButtonRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.ForwardButtonRenderer);

/**
 * @type {string}
 */
filebrowser.ForwardButtonRenderer.CSS_CLASS = goog.getCssName('fb-forward');

/**
 * @return {string}
 */
filebrowser.ForwardButtonRenderer.prototype.getCssClass = function() {
  return filebrowser.ForwardButtonRenderer.CSS_CLASS;
};
