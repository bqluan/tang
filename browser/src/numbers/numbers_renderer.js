goog.provide('numbers.NumbersRenderer');

goog.require('goog.ui.ControlRenderer');

numbers.NumbersRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(numbers.NumbersRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(numbers.NumbersRenderer);

/**
 * @type {string}
 */
numbers.NumbersRenderer.CSS_CLASS = goog.getCssName('numbers');

/**
 * @return {string}
 * @override
 */
numbers.NumbersRenderer.prototype.getCssClass = function() {
  return numbers.NumbersRenderer.CSS_CLASS;
};

/**
 * @param {numbers.Numbers} control
 * @return {Element}
 * @override
 */
numbers.NumbersRenderer.prototype.createDom = function(control) {
  var dom = control.getDomHelper();
  var base = numbers.NumbersRenderer.CSS_CLASS;
  return dom.createDom(
    'div',
    this.getClassNames(control).join(' '),
    dom.createDom('div', goog.getCssName(base, 'title'), control.getFilename()),
    dom.createDom('div', goog.getCssName(base, 'content')));
};

/**
 * @param {Element} element
 * @return {Element}
 */
numbers.NumbersRenderer.prototype.getContentElement = function(element) {
  return element.firstChild.nextSibling;
};
