goog.provide('filebrowser.BackButtonRenderer');

goog.require('goog.ui.ButtonRenderer');

/** @constructor */
filebrowser.BackButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(filebrowser.BackButtonRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.BackButtonRenderer);

filebrowser.BackButtonRenderer.CSS_CLASS = goog.getCssName('filebrowser-back');

filebrowser.BackButtonRenderer.prototype.getCssClass = function() {
  return filebrowser.BackButtonRenderer.CSS_CLASS;
};
