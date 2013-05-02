goog.provide('numbers.Numbers');

goog.require('fs');
goog.require('goog.ui.Control');
goog.require('numbers.Model');
goog.require('numbers.NumbersRenderer');
goog.require('numbers.Table');

/**
 * @param {string} filename
 * @param {numbers.NumbersRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Control}
 */
numbers.Numbers = function(filename, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
    this,
    null,
    opt_renderer || numbers.NumbersRenderer.getInstance(),
    opt_domHelper);
  this.filename_ = filename;
};
goog.inherits(numbers.Numbers, goog.ui.Control);

/**
 * @type {string}
 * @private
 */
numbers.Numbers.prototype.filename_;

/**
 * @return {string}
 */
numbers.Numbers.prototype.getFilename = function() {
  return this.filename_;
};

/**
 * @override
 */
numbers.Numbers.prototype.enterDocument = function() {
  numbers.Numbers.superClass_.enterDocument.call(this);
  var self = this;
  fs.readFile(this.filename_, function(err, data) {
    var model = new numbers.Model(data);
    var table = new numbers.Table(model);
    table.setParent(self);
    table.render(self.renderer_.getContentElement(self.element_));
  });
};
