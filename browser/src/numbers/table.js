goog.provide('numbers.Table');

goog.require('goog.ui.Control');
goog.require('numbers.Model');
goog.require('numbers.TableRenderer');

/**
 * @param {numbers.Model} model
 * @param {numbers.TableRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Control}
 */
numbers.Table = function(model, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
    this,
    null,
    opt_renderer || numbers.TableRenderer.getInstance(),
    opt_domHelper);
  this.model_ = model;
};
goog.inherits(numbers.Table, goog.ui.Control);

/**
 * @type {numbers.Model}
 */
numbers.Table.prototype.model_;

/**
 * @param {numbers.Model} model
 */
numbers.Table.prototype.setModel = function(model) {
  this.model_ = model;
};

/**
 * @return {numbers.Model}
 */
numbers.Table.prototype.getModel = function() {
  return this.model_;
};
