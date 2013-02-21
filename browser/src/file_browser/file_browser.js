goog.provide('filebrowser.FileBrowser');

goog.require('filebrowser.File');
goog.require('filebrowser.FileBrowserRenderer');
goog.require('fs');
goog.require('goog.string.path');
goog.require('goog.ui.Container');

/** @constructor */
filebrowser.FileBrowser = function(cwd, opt_renderer, opt_domHelper) {
  goog.ui.Container.call(
    this,
    goog.ui.Container.Orientation.VERTICAL,
    opt_renderer || filebrowser.FileBrowserRenderer.getInstance(),
    opt_domHelper);
  this.cwd_ = cwd;
  this.setFocusable(false);
};
goog.inherits(filebrowser.FileBrowser, goog.ui.Container);

filebrowser.FileBrowser.prototype.getCwd = function() {
  return this.cwd_;
};

filebrowser.FileBrowser.prototype.enterDocument = function() {
  goog.ui.Container.superClass_.enterDocument.call(this);

  this.forEachChild(function(child) {
    if (child.isInDocument()) {
      this.registerChildId_(child);
    }
  }, this);

  var contentElement = this.getContentElement();
  this.getHandler().
    listen(this, goog.ui.Component.EventType.SELECT, this.handleSelectItem).
    listen(this, goog.ui.Component.EventType.UNSELECT, this.handleUnSelectItem).
    listen(contentElement, goog.events.EventType.MOUSEDOWN,
      this.handleContentMouseDown).
    listen(contentElement, [
      goog.events.EventType.MOUSEDOWN,
      goog.events.EventType.DBLCLICK
    ], this.handleChildMouseEvents);

  this.refresh();
};

filebrowser.FileBrowser.prototype.handleSelectItem = function(e) {
  if (this.isEnabled()) {
    if (this.selectedItem_ && e.target !== this.selectedItem_) {
      this.selectedItem_.setSelected(false);
    }
    this.selectedItem_ = e.target;
  }
};

filebrowser.FileBrowser.prototype.handleUnSelectItem = function(e) {
  if (this.isEnabled()
      && this.selectedItem_
      && e.target === this.selectedItem_) {
    this.selectedItem_ = null;
  }
};

filebrowser.FileBrowser.prototype.handleContentMouseDown = function(e) {
  if (this.isEnabled()
      && this.selectedItem_
      && (e.target === this.getContentElement()
          || e.target === this.getOwnerControl(e.target).getElement())) {
    this.selectedItem_.setSelected(false);
    this.selectedItem_ = null;
  }
};

filebrowser.FileBrowser.prototype.handleChildMouseEvents = function(e) {
  var control = this.getOwnerControl(e.target);
  if (control) {
    switch (e.type) {
      case goog.events.EventType.MOUSEDOWN:
        control.handleMouseDown(e);
        break;
      case goog.events.EventType.MOUSEUP:
        control.handleMouseUp(e);
        break;
      case goog.events.EventType.MOUSEOVER:
        control.handleMouseOver(e);
        break;
      case goog.events.EventType.MOUSEOUT:
        control.handleMouseOut(e);
        break;
      case goog.events.EventType.CONTEXTMENU:
        control.handleContextMenu(e);
        break;
      case goog.events.EventType.DBLCLICK:
        control.handleDblClick(e);
        break
    }
  }
};

filebrowser.FileBrowser.prototype.refresh = function() {
  this.removeChildren(true);
  var self = this;
  fs.readdir(this.cwd_, function(err, files) {
    if (!err) {
      files.forEach(function(file) {
        self.addChild(
          new filebrowser.File(goog.string.path.join(self.cwd_, file)),
          true);
      });
    }
  });
};
