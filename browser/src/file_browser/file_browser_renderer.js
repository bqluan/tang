goog.provide('filebrowser.FileBrowserRenderer');

/**
 * @constructor
 */
filebrowser.FileBrowserRenderer = function() {
};
goog.addSingletonGetter(filebrowser.FileBrowserRenderer);

/**
 * @type {string}
 */
filebrowser.FileBrowserRenderer.CSS_CLASS = goog.getCssName('fb');

/**
 * @return {string}
 */
filebrowser.FileBrowserRenderer.prototype.getCssClass = function() {
  return filebrowser.FileBrowserRenderer.CSS_CLASS;
};

/**
 * @param {filebrowser.FileBrowser}
 * @return {Element}
 */
filebrowser.FileBrowserRenderer.prototype.createDom = function(control) {
  var dom = control.getDomHelper();
  var baseClass = filebrowser.FileBrowserRenderer.CSS_CLASS;
  return dom.createDom(
    'div',
    this.getCssClass(),
    dom.createDom('div', goog.getCssName(baseClass, 'cwd'), control.getCwd()),
    dom.createDom('div', goog.getCssName(baseClass, 'back')),
    dom.createDom('div', goog.getCssName(baseClass, 'forward')),
    dom.createDom('div', goog.getCssName(baseClass, 'fl')));
};

/**
 * @param {Element}
 * @return {Element}
 */
filebrowser.FileBrowserRenderer.prototype.getCwdElement = function(element) {
  return element.firstChild;
};

/**
 * @param {Element}
 * @return {Element}
 */
filebrowser.FileBrowserRenderer.prototype.getBackElement = function(element) {
  return element.firstChild.nextSibling;
};

/**
 * @param {Element}
 * @return {Element}
 */
filebrowser.FileBrowserRenderer.prototype.getForwardElement = function(element) {
  return element.firstChild.nextSibling.nextSibling;
};

/**
 * @param {Element}
 * @return {Element}
 */
filebrowser.FileBrowserRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling.nextSibling.nextSibling;
};
