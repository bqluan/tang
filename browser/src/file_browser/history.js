goog.provide('filebrowser.History');

/** @constructor */
filebrowser.History = function(path) {
  this.backward_ = [path];
  this.forward_ = [];
};

filebrowser.History.prototype.enter = function(path) {
  this.backward_.push(path);
  if (this.forward_.length > 0) this.forward_ = [];
};

filebrowser.History.prototype.canMoveBack = function() {
  return this.backward_.length > 1;
};

filebrowser.History.prototype.moveBack = function() {
  this.forward_.push(this.backward_.pop());
};

filebrowser.History.prototype.canMoveForward = function() {
  return this.forward_.length > 0;
};

filebrowser.History.prototype.moveForward = function() {
  this.backward_.push(this.forward_.pop());
};

filebrowser.History.prototype.getPath = function() {
  return this.backward_[this.backward_.length - 1];
};
