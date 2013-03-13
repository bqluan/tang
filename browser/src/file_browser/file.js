goog.provide('filebrowser.File');
goog.provide('filebrowser.File.EventType');

goog.require('filebrowser.FileRenderer');
goog.require('fs');
goog.require('fs.Stats');
goog.require('goog.ui.Control');
goog.require('path');

/**
 * @param {string} filename
 * @param {fs.Stats} stats
 * @param {filebrowser.FileRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Control}
 */
filebrowser.File = function(filename, stats, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
    this,
    path.basename(filename),
    opt_renderer || filebrowser.FileRenderer.getInstance(),
    opt_domHelper);
  this.filename_ = filename;
  this.stats_ = stats;
  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(filebrowser.File, goog.ui.Control);

/**
 * @enum {string}
 */
filebrowser.File.EventType = {
  OPEN: 'fopen'
};

/**
 * @type {string}
 * @private
 */
filebrowser.File.prototype.filename_;

/**
 * @type {fs.Stats}
 * @private
 */
filebrowser.File.prototype.stats_;

/**
 * @return {string}
 */
filebrowser.File.prototype.getFilename = function() {
  return this.filename_;
};

/**
 * @return {fs.Stats}
 */
filebrowser.File.prototype.getStats = function() {
  return this.stats_;
};

/**
 * @param {Node} element
 * @return {boolean}
 */
filebrowser.File.prototype.shouldHandleMouseEvent = function(element) {
  return element !== this.element_;
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.File.prototype.handleMouseDown = function(e) {
  if (this.isEnabled() && this.shouldHandleMouseEvent(e.target)) {
    this.setSelected(true);
  }
  // Cancel the default action unless the control allows text selection.
  if (!this.isAllowTextSelection() && e.isMouseActionButton()) {
    e.preventDefault();
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.File.prototype.handleMouseUp = function(e) {
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.File.prototype.handleMouseOver = function(e) {
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.File.prototype.handleMouseOut = function(e) {
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.File.prototype.handleDblClick = function(e) {
  if (this.isEnabled() && this.shouldHandleMouseEvent(e.target)) {
    this.open();
  }
};

filebrowser.File.prototype.open = function() {
  if (this.stats_.isFile()) {
    this.openFile_();
  } else if (this.stats_.isDirectory()) {
    this.openDirectory_();
  }
};

/**
 * @private
 */
filebrowser.File.prototype.openFile_ = function() {
  fs.download(this.filename_, function(err) {
    if (!err) {
      this.dispatchEvent(filebrowser.File.EventType.OPEN);
    }
  });
};

/**
 * @private
 */
filebrowser.File.prototype.openDirectory_ = function() {
  this.dispatchEvent(filebrowser.File.EventType.OPEN);
};
