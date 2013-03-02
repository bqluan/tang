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
    dom.createDom('div', goog.getCssName(baseClass, 'back')),
    dom.createDom('div', goog.getCssName(baseClass, 'forward')),
    dom.createDom('div', goog.getCssName(baseClass, 'content')));
};

filebrowser.FileBrowserRenderer.prototype.getCwdElement = function(element) {
  return element.firstChild;
};

filebrowser.FileBrowserRenderer.prototype.getBackElement = function(element) {
  return element.firstChild.nextSibling;
};

filebrowser.FileBrowserRenderer.prototype.getForwardElement = function(element) {
  return element.firstChild.nextSibling.nextSibling;
};

filebrowser.FileBrowserRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling.nextSibling.nextSibling;
};

filebrowser.FileBrowserRenderer.prototype.setCwd = function(control, cwd) {
  control.getDomHelper().setTextContent(
    this.getCwdElement(control.getElement()), cwd);
};

filebrowser.FileBrowserRenderer.prototype.createUploadForm = function(control) {
  var dom = control.getDomHelper();
  return dom.createDom(
    'form',
    {enctype: 'multipart/form-data', method: 'POST'},
    dom.createDom('span', undefined, control.getSymbols().UPLOAD_FILE),
    dom.createDom('input', {name: 'filename', type: 'file'}));
};
