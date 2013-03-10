goog.provide('filebrowser.History');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
filebrowser.History = function() {
  goog.events.EventTarget.call(this);
  this.backward_ = [];
  this.forward_ = [];
};
goog.inherits(filebrowser.History, goog.events.EventTarget);

/**
 * @type {Array.<string>}
 */
filebrowser.History.prototype.backward_;

/**
 * @type {Array.<string>}
 */
filebrowser.History.prototype.forward_;

/**
 * @param {string} path
 */
filebrowser.History.prototype.push = function(path) {
  this.backward_.push(path);
  if (this.forward_.length > 0) this.forward_ = [];
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

/**
 * @return {boolean}
 */
filebrowser.History.prototype.canMoveBack = function() {
  return this.backward_.length > 1;
};

filebrowser.History.prototype.moveBack = function() {
  this.forward_.push(this.backward_.pop());
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

/**
 * @return {boolean}
 */
filebrowser.History.prototype.canMoveForward = function() {
  return this.forward_.length > 0;
};

filebrowser.History.prototype.moveForward = function() {
  this.backward_.push(this.forward_.pop());
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

/**
 * @return {string}
 */
filebrowser.History.prototype.peek = function() {
  return this.backward_[this.backward_.length - 1];
};
