goog.provide('filebrowser.FileRenderer');

goog.require('goog.style');
goog.require('goog.ui.ControlRenderer');

/** @constructor */
filebrowser.FileRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(filebrowser.FileRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.FileRenderer);

filebrowser.FileRenderer.CSS_CLASS = goog.getCssName('filebrowser-file');

filebrowser.FileRenderer.prototype.getCssClass = function() {
  return filebrowser.FileRenderer.CSS_CLASS;
};

filebrowser.FileRenderer.prototype.createDom = function(control) {
  return control.getDomHelper().createDom(
    'div',
    this.getClassNames(control).join(' '),
    this.createIconElement_(control),
    this.createNameElement_(control));
};

filebrowser.FileRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling;
};

filebrowser.FileRenderer.prototype.createIconElement_ = function(control) {
  var icon = control.getDomHelper().createDom(
    'div',
    goog.getCssName(filebrowser.FileRenderer.CSS_CLASS, 'icon'));
  goog.style.setStyle(
    icon, 'background-image', this.getIconUrl_(control.getStats()));
  return icon;
};

filebrowser.FileRenderer.prototype.createNameElement_ = function(control) {
  return control.getDomHelper().createDom(
    'div',
    goog.getCssName(filebrowser.FileRenderer.CSS_CLASS, 'name'),
    control.getContent());
};

filebrowser.FileRenderer.prototype.getIconUrl_ = function(stats) {
  return 'url("' + (stats.isDirectory() ? 'folder' : 'mime/unknown') + '.png")';
};
