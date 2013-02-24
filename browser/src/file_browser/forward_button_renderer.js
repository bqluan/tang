goog.provide('filebrowser.ForwardButtonRenderer');

goog.require('goog.ui.ButtonRenderer');

/** @constructor */
filebrowser.ForwardButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
};
goog.inherits(filebrowser.ForwardButtonRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.ForwardButtonRenderer);

filebrowser.ForwardButtonRenderer.CSS_CLASS = goog.getCssName('filebrowser-forward');

filebrowser.ForwardButtonRenderer.prototype.getCssClass = function() {
  return filebrowser.ForwardButtonRenderer.CSS_CLASS;
};
