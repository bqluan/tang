goog.provide('filebrowser.FileList');

goog.require('filebrowser.File');
goog.require('filebrowser.FileListRenderer');
goog.require('filebrowser.Symbols_zh');
goog.require('fs');
goog.require('goog.ui.Container');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuSeparator');
goog.require('goog.ui.PopupMenu');
goog.require('path');

/**
 * @param {string} cwd
 * @param {filebrowser.FileListRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Container}
 */
filebrowser.FileList = function(cwd, opt_renderer, opt_domHelper) {
  goog.ui.Container.call(
    this,
    goog.ui.Container.Orientation.HORIZONTAL,
    opt_renderer || filebrowser.FileListRenderer.getInstance(),
    opt_domHelper);
  this.symbols_ = filebrowser.Symbols_zh;
  this.cwd_ = cwd;
};
goog.inherits(filebrowser.FileList, goog.ui.Container);

/**
 * @type {string}
 */
filebrowser.FileList.prototype.cwd_;

/**
 * @type {filebrowser.File}
 */
filebrowser.FileList.prototype.selectedItem_;

/**
 * @type {goog.ui.PopupMenu}
 */
filebrowser.FileList.prototype.menu_;

/**
 * @type {goog.ui.PopupMenu}
 */
filebrowser.FileList.prototype.childMenu_;

/**
 * @param {string} cwd
 */
filebrowser.FileList.prototype.setCwd = function(cwd) {
  if (cwd !== this.cwd_) {
    this.cwd_ = cwd;
    this.refresh_();
  }
};

/** @override */
filebrowser.FileList.prototype.enterDocument = function() {
  filebrowser.FileList.superClass_.enterDocument.call(this);

  var element = this.getElement();
  this.getHandler().
    listen(this, goog.ui.Component.EventType.SELECT, this.handleSelectItem).
    listen(this, goog.ui.Component.EventType.UNSELECT, this.handleUnSelectItem).
    listen(element, goog.events.EventType.CONTEXTMENU, this.handleContextMenu);

  this.menu_ = this.createMenu_();
  this.childMenu_ = this.createChildMenu_();

  this.getHandler().listen(
    element,
    goog.events.EventType.DBLCLICK,
    this.handleChildMouseEvents);

  this.refresh_();
};

/**
 * @param {goog.events.BrowserEvent} e
 * @override
 */
filebrowser.FileList.prototype.handleChildMouseEvents = function(e) {
  /** @type {filebrowser.File} */
  var file = this.getOwnerControl(e.target);
  if (file && file.shouldHandleMouseEvent(e.target)) {
    switch (e.type) {
      case goog.events.EventType.MOUSEDOWN:
        file.handleMouseDown(e);
        break;
      case goog.events.EventType.MOUSEUP:
        file.handleMouseUp(e);
        break;
      case goog.events.EventType.MOUSEOVER:
        file.handleMouseOver(e);
        break;
      case goog.events.EventType.MOUSEOUT:
        file.handleMouseOut(e);
        break;
      case goog.events.EventType.CONTEXTMENU:
        this.handleChildContextMenu(e);
        break;
      case goog.events.EventType.DBLCLICK:
        file.handleDblClick(e);
        break;
    }
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileList.prototype.handleMouseDown = function(e) {
  filebrowser.FileList.superClass_.handleMouseDown.call(this, e);
  /** @type {Node} */
  var target = e.target;
  if (this.isEnabled()
      && this.selectedItem_
      && (target === this.getElement()
          || !this.getOwnerControl(target).shouldHandleMouseEvent(target))) {
    this.selectedItem_.setSelected(false);
    this.selectedItem_ = null;
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileList.prototype.handleSelectItem = function(e) {
  if (this.isEnabled()) {
    /** @type {filebrowser.File} */
    var target = e.target;
    if (this.selectedItem_ && target !== this.selectedItem_) {
      this.selectedItem_.setSelected(false);
    }
    this.selectedItem_ = target;
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileList.prototype.handleUnSelectItem = function(e) {
  /** @type {filebrowser.File} */
  var target = e.target;
  if (this.isEnabled()
      && this.selectedItem_
      && target === this.selectedItem_) {
    this.selectedItem_ = null;
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileList.prototype.handleChildContextMenu = function(e) {
  if (this.isEnabled()) {
    this.childMenu_.showAt(e.clientX, e.clientY);
    e.preventDefault();
    e.stopPropagation();
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileList.prototype.handleContextMenu = function(e) {
  if (this.isEnabled()) {
    /** @type {Node} */
    var element = e.target;
    if (element === this.element_) {
      this.menu_.showAt(e.clientX, e.clientY);
      e.preventDefault();
      e.stopPropagation();
    } else {
      /** @type {filebrowser.File} */
      var file = this.getOwnerControl(element);
      if (file && !file.shouldHandleMouseEvent(element)) {
        this.menu_.showAt(e.clientX, e.clientY);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleOpen = function(e) {
  if (this.isEnabled() && this.selectedItem_) {
    this.selectedItem_.open();
  }
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleDownload = function(e) {
  if (this.isEnabled()
      && this.selectedItem_
      && this.selectedItem_.getStats().isFile()) {
    fs.download(this.selectedItem_.getFilename(), function(err) {
    });
  }
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleDelete = function(e) {
  if (this.isEnabled()
      && this.selectedItem_
      && this.selectedItem_.getStats().isFile()) {
    var self = this;
    fs.unlink(this.selectedItem_.getFilename(), function(err) {
      if (!err) {
        self.removeChild(self.selectedItem_, true);
        self.selectedItem_.dispose();
        self.selectedItem_ = null;
      }
    });
  }
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleNewFile = function(e) {
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleNewFolder = function(e) {
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileList.prototype.handleUploadFile = function(e) {
  /** @type {HTMLInputElement} */
  var input = e.target;
  var self = this;
  fs.upload('/', input.form, function(err) {
    if (!err) self.refresh_();
  });
};

/**
 * @return {goog.ui.PopupMenu}
 */
filebrowser.FileList.prototype.createChildMenu_ = function() {
  var open = new goog.ui.MenuItem(this.symbols_.OPEN);
  var down = new goog.ui.MenuItem(this.symbols_.DOWNLOAD);
  var del = new goog.ui.MenuItem(this.symbols_.DELETE);

  var menu = new goog.ui.PopupMenu();
  menu.addItem(open);
  menu.addItem(down);
  menu.addItem(new goog.ui.MenuSeparator());
  menu.addItem(del);
  menu.render();

  this.getHandler().
    listen(open, goog.ui.Component.EventType.ACTION, this.handleOpen).
    listen(down, goog.ui.Component.EventType.ACTION, this.handleDownload).
    listen(del, goog.ui.Component.EventType.ACTION, this.handleDelete);

  return menu;
};

/**
 * @return {goog.ui.PopupMenu}
 */
filebrowser.FileList.prototype.createMenu_ = function() {
  var newFile = new goog.ui.MenuItem(this.symbols_.CREATE_NEW_FILE);
  var newFolder = new goog.ui.MenuItem(this.symbols_.CREATE_NEW_FOLDER);
  var form = this.createUploadForm_();
  var uploadFile = new goog.ui.MenuItem(form);

  var menu = new goog.ui.PopupMenu();
  menu.addItem(newFile);
  menu.addItem(newFolder);
  menu.addItem(new goog.ui.MenuSeparator());
  menu.addItem(uploadFile);
  menu.render();

  this.getHandler().
    listen(newFile, goog.ui.Component.EventType.ACTION, this.handleNewFile).
    listen(newFolder, goog.ui.Component.EventType.ACTION, this.handleNewFolder).
    listen(form, goog.events.EventType.CHANGE, this.handleUploadFile);

  return menu;
};

/**
 * @return {HTMLFormElement}
 */
filebrowser.FileList.prototype.createUploadForm_ = function() {
  var dom = this.getDomHelper();
  return dom.createDom(
    'form',
    {enctype: 'multipart/form-data', method: 'POST'},
    dom.createDom('span', null, this.symbols_.UPLOAD_FILE),
    dom.createDom('input', {name: 'file', type: 'file'}));
};

filebrowser.FileList.prototype.refresh_ = function() {
  this.removeChildren(true);
  var self = this;
  /**
   * @param {fs.FSError} err
   * @param {Array.<string>} files
   */
  var onreaddir = function(err, files) {
    if (!err) {
      files.forEach(
        /**
         * @param {string} file
         */
        function(file) {
          var absolute = path.join(self.cwd_, file);
          fs.lstat(
            absolute,
            /**
             * @param {fs.FSError} err
             * @param {fs.Stats} stats
             */
            function(err, stats) {
              if (!err) {
                self.addChild(new filebrowser.File(absolute, stats), true);
              }
            });
        });
    }
  };
  fs.readdir(this.cwd_, onreaddir);
};
