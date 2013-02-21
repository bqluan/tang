goog.provide('filebrowser.FileBrowserRenderer');

goog.require('goog.ui.ContainerRenderer');

/** @constructor */
filebrowser.FileBrowserRenderer = function() {
  goog.ui.ContainerRenderer.call(this);
};
goog.inherits(filebrowser.FileBrowserRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(filebrowser.FileBrowserRenderer);

filebrowser.FileBrowserRenderer.CSS_CLASS = goog.getCssName('filebrowser');

filebrowser.FileBrowserRenderer.prototype.getCssClass = function() {
  return filebrowser.FileBrowserRenderer.CSS_CLASS;
};

filebrowser.FileBrowserRenderer.prototype.createDom = function(control) {
  var dom = control.getDomHelper();
  var baseClass = filebrowser.FileBrowserRenderer.CSS_CLASS;
  return dom.createDom(
    'div',
    this.getClassNames(control).join(' '),
    dom.createDom('div', goog.getCssName(baseClass, 'cwd'), control.getCwd()),
    dom.createDom('div', goog.getCssName(baseClass, 'content')));
};

filebrowser.FileBrowserRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling;
};
