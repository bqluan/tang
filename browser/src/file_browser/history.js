goog.provide('filebrowser.History');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');

/** @constructor */
filebrowser.History = function() {
  goog.events.EventTarget.call(this);
  this.backward_ = [];
  this.forward_ = [];
};
goog.inherits(filebrowser.History, goog.events.EventTarget);

filebrowser.History.prototype.enter = function(path) {
  this.backward_.push(path);
  if (this.forward_.length > 0) this.forward_ = [];
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

filebrowser.History.prototype.canMoveBack = function() {
  return this.backward_.length > 1;
};

filebrowser.History.prototype.moveBack = function() {
  this.forward_.push(this.backward_.pop());
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

filebrowser.History.prototype.canMoveForward = function() {
  return this.forward_.length > 0;
};

filebrowser.History.prototype.moveForward = function() {
  this.backward_.push(this.forward_.pop());
  this.dispatchEvent(new goog.events.Event(goog.events.EventType.CHANGE));
};

filebrowser.History.prototype.getPath = function() {
  return this.backward_[this.backward_.length - 1];
};
