goog.provide('numbers.TableRenderer');

goog.require('goog.ui.ControlRenderer');

numbers.TableRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(numbers.TableRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(numbers.TableRenderer);

/**
 * @type {string}
 */
numbers.TableRenderer.CSS_CLASS = goog.getCssName('numbers-table');

/**
 * @return {string}
 * @override
 */
numbers.TableRenderer.prototype.getCssClass = function() {
  return numbers.TableRenderer.CSS_CLASS;
};

/**
 * @param {numbers.Table} control
 * @return {Element}
 * @override
 */
numbers.TableRenderer.prototype.createDom = function(control) {
  /** @type {numbers.Model} */
  var model = control.getModel();
  return control.getDomHelper().createTable(
    model.getRowCount(), model.getColumnCount());
};

/**
 * @param {Element} element
 * @return {Element}
 */
numbers.TableRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling;
};
