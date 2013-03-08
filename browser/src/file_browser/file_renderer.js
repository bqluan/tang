goog.provide('filebrowser.FileRenderer');

goog.require('fs.Stats');
goog.require('goog.ui.ControlRenderer');

/**
 * @constructor
 */
filebrowser.FileRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(filebrowser.FileRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(filebrowser.FileRenderer);

/**
 * @type {string}
 */
filebrowser.FileRenderer.CSS_CLASS = goog.getCssName('fb-file');

/**
 * @return {string}
 */
filebrowser.FileRenderer.prototype.getCssClass = function() {
  return filebrowser.FileRenderer.CSS_CLASS;
};

/**
 * @param {filebrowser.File} control
 * @return {Element}
 */
filebrowser.FileRenderer.prototype.createDom = function(control) {
  return control.getDomHelper().createDom(
    'div',
    this.getClassNames(control).join(' '),
    this.createIconElement_(control),
    this.createNameElement_(control));
};

/**
 * @param {Element} element
 * @return {Element}
 */
filebrowser.FileRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling;
};

/**
 * @param {Element} element
 * @return {Element}
 */
filebrowser.FileRenderer.prototype.getIconElement = function(element) {
  return element.firstChild;
};

/**
 * @param {Element} element
 * @param {fs.Stats} stats
 */
filebrowser.FileRenderer.prototype.setStats = function(element, stats) {
  var iconElement = this.getIconElement(element);
  var iconUrl = this.getIconUrl_(stats);
  goog.style.setStyle(iconElement, 'background-image', iconUrl);
};

/**
 * @param {filebrowser.File} control
 * @return {Element}
 * @private
 */
filebrowser.FileRenderer.prototype.createIconElement_ = function(control) {
  var element = control.getDomHelper().createDom(
    'div',
    goog.getCssName(filebrowser.FileRenderer.CSS_CLASS, 'icon'));
  var iconUrl = this.getIconUrl_(control.getStats());
  goog.style.setStyle(element, 'background-image', iconUrl);
  return element;
};

/**
 * @param {filebrowser.File} control
 * @return {Element}
 * @private
 */
filebrowser.FileRenderer.prototype.createNameElement_ = function(control) {
  return control.getDomHelper().createDom(
    'div',
    goog.getCssName(filebrowser.FileRenderer.CSS_CLASS, 'name'),
    control.getContent());
};

/**
 * @param {fs.Stats} stats
 * @return {string}
 * @private
 */
filebrowser.FileRenderer.prototype.getIconUrl_ = function(stats) {
  return stats.isFile() ?
    'url("file_browser/mime/unknown.png")' :
    'url("file_browser/folder.png")';
};
