goog.provide('filebrowser.BackButtonRenderer');

goog.require('goog.ui.ButtonRenderer');

/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
filebrowser.BackButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(filebrowser.BackButtonRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.BackButtonRenderer);

/**
 * @type {string}
 */
filebrowser.BackButtonRenderer.CSS_CLASS = goog.getCssName('fb-back');

/**
 * @return {string}
 */
filebrowser.BackButtonRenderer.prototype.getCssClass = function() {
  return filebrowser.BackButtonRenderer.CSS_CLASS;
};
