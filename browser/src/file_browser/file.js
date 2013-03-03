goog.provide('filebrowser.File');

goog.require('filebrowser.FileRenderer');
goog.require('fs');
goog.require('goog.string.path');
goog.require('goog.ui.Control');

/** @constructor */
filebrowser.File = function(filename, stats, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(
    this,
    goog.string.path.basename(filename),
    opt_renderer || filebrowser.FileRenderer.getInstance(),
    opt_domHelper);
  this.filename_ = filename;
  this.stats_ = stats;
  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(filebrowser.File, goog.ui.Control);

filebrowser.File.prototype.getStats = function() {
  return this.stats_;
};

filebrowser.File.prototype.getFilename = function() {
  return this.filename_;
};

filebrowser.File.prototype.handleMouseDown = function(e) {
  if (this.isEnabled()) {
    this.setSelected(e.target !== this.element_);
  }
};

filebrowser.File.prototype.handleDblClick = function(e) {
  if (this.isEnabled()) {
    this.setSelected(e.target !== this.element_);
    if (this.stats_ && this.stats_.isFile()) {
      fs.download(this.filename_, function(err) {
      });
    }
  }
};
