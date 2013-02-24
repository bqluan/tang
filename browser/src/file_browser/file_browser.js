goog.provide('filebrowser.FileBrowser');

goog.require('filebrowser.BackButtonRenderer');
goog.require('filebrowser.File');
goog.require('filebrowser.FileBrowserRenderer');
goog.require('filebrowser.ForwardButtonRenderer');
goog.require('filebrowser.History');
goog.require('fs');
goog.require('goog.string.path');
goog.require('goog.ui.Button');
goog.require('goog.ui.Container');

/** @constructor */
filebrowser.FileBrowser = function(cwd, opt_renderer, opt_domHelper) {
  goog.ui.Container.call(
    this,
    goog.ui.Container.Orientation.VERTICAL,
    opt_renderer || filebrowser.FileBrowserRenderer.getInstance(),
    opt_domHelper);
  this.cwd_ = cwd;
  this.history_ = new filebrowser.History();
  this.getHandler().listen(
    this.history_, goog.events.EventType.CHANGE, this.handleHistoryChange);
  this.history_.enter(cwd);
  this.setFocusable(false);
};
goog.inherits(filebrowser.FileBrowser, goog.ui.Container);

filebrowser.FileBrowser.prototype.getCwd = function() {
  return this.cwd_;
};

filebrowser.FileBrowser.prototype.setCwd = function(cwd) {
  this.renderer_.setCwd(this, goog.string.path.basename(cwd) || '/');
  this.cwd_ = cwd;
  this.refresh();
};

filebrowser.FileBrowser.prototype.enterDocument = function() {
  goog.ui.Container.superClass_.enterDocument.call(this);

  var backButton = new goog.ui.Button(null, filebrowser.BackButtonRenderer.getInstance());
  backButton.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  backButton.decorate(this.renderer_.getBackElement(this.element_));
  backButton.setEnabled(false);
  this.backButton_ = backButton;

  var forwardButton = new goog.ui.Button(null, filebrowser.ForwardButtonRenderer.getInstance());
  forwardButton.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  forwardButton.decorate(this.renderer_.getForwardElement(this.element_));
  forwardButton.setEnabled(false);
  this.forwardButton_ = forwardButton;

  var contentElement = this.getContentElement();
  this.getHandler().
    listen(backButton, goog.ui.Component.EventType.ACTION, this.handleBackAction).
    listen(forwardButton, goog.ui.Component.EventType.ACTION, this.handleForwardAction).
    listen(this, goog.ui.Component.EventType.SELECT, this.handleSelectItem).
    listen(this, goog.ui.Component.EventType.UNSELECT, this.handleUnSelectItem).
    listen(contentElement, goog.events.EventType.MOUSEDOWN,
      this.handleContentMouseDown).
    listen(contentElement, goog.events.EventType.DBLCLICK,
      this.handleContentDblClick).
    listen(contentElement, [
      goog.events.EventType.MOUSEDOWN,
      goog.events.EventType.DBLCLICK
    ], this.handleChildMouseEvents);

  this.refresh();
};

filebrowser.FileBrowser.prototype.handleHistoryChange = function(e) {
  this.backButton_ && this.backButton_.setEnabled(e.target.canMoveBack());
  this.forwardButton_ && this.forwardButton_.setEnabled(e.target.canMoveForward());
};

filebrowser.FileBrowser.prototype.handleBackAction = function(e) {
  if (this.history_.canMoveBack()) {
    this.history_.moveBack();
    this.setCwd(this.history_.getPath());
  }
};

filebrowser.FileBrowser.prototype.handleForwardAction = function(e) {
  if (this.history_.canMoveForward()) {
    this.history_.moveForward();
    this.setCwd(this.history_.getPath());
  }
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

filebrowser.FileBrowser.prototype.handleContentDblClick = function(e) {
  this.handleContentMouseDown(e);
  if (this.isEnabled() && e.target !== this.getContentElement()) {
    var child = this.getOwnerControl(e.target);
    var stats = child.getStats();
    if (stats && stats.isDirectory()) {
      var dirname = child.getFilename();
      this.setCwd(dirname);
      this.history_.enter(dirname);
    }
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
