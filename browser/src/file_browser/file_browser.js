goog.provide('filebrowser.FileBrowser');

goog.require('filebrowser.BackButtonRenderer');
goog.require('filebrowser.File');
goog.require('filebrowser.FileBrowserRenderer');
goog.require('filebrowser.FileList');
goog.require('filebrowser.ForwardButtonRenderer');
goog.require('fs');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('path');

/**
 * @param {string} cwd
 * @param {filebrowser.FileBrowserRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
filebrowser.FileBrowser = function(cwd, opt_renderer, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.cwd_ = cwd;
  this.renderer_ =
    opt_renderer || filebrowser.FileBrowserRenderer.getInstance();
};
goog.inherits(filebrowser.FileBrowser, goog.ui.Component);

/**
 * @type {goog.ui.Button}
 */
filebrowser.FileBrowser.prototype.backButton_;

/**
 * @type {goog.ui.Button}
 */
filebrowser.FileBrowser.prototype.forwardButton_;

/**
 * @type {filebrowser.FileList}
 */
filebrowser.FileBrowser.prototype.fileList_;

/**
 * @return {string}
 */
filebrowser.FileBrowser.prototype.getCwd = function() {
  return this.cwd_;
};

/** @override */
filebrowser.FileBrowser.prototype.createDom = function() {
  this.element_ = this.renderer_.createDom(this);
};

/** @override */
filebrowser.FileBrowser.prototype.enterDocument = function() {
  filebrowser.FileBrowser.superClass_.enterDocument.call(this);
  this.backButton_ = this.decorateBackElement_();
  this.forwardButton_ = this.decorateForwardElement_();
  this.fileList_ = this.decorateContentElement_();
  this.refresh();
};

filebrowser.FileBrowser.prototype.refresh = function() {
  this.fileList_.removeChildren(true);
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
                self.fileList_.addChild(
                  new filebrowser.File(absolute, stats), true);
              }
            });
        });
    }
  };
  fs.readdir(this.cwd_, onreaddir);
};

/**
 * @return {goog.ui.Button}
 */
filebrowser.FileBrowser.prototype.decorateBackElement_ = function() {
  var backButton = new goog.ui.Button(
    null, filebrowser.BackButtonRenderer.getInstance());
  backButton.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  backButton.decorate(this.renderer_.getBackElement(this.element_));
  this.getHandler().listen(
    backButton, goog.ui.Component.EventType.ACTION, this.handleBackAction);
  return backButton;
};

/**
 * @return {goog.ui.Button}
 */
filebrowser.FileBrowser.prototype.decorateForwardElement_ = function() {
  var forwardButton = new goog.ui.Button(
    null, filebrowser.ForwardButtonRenderer.getInstance());
  forwardButton.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  forwardButton.decorate(this.renderer_.getForwardElement(this.element_));
  this.getHandler().listen(
    forwardButton, goog.ui.Component.EventType.ACTION, this.handleForwardAction);
  return forwardButton;
};

/**
 * @return {filebrowser.FileList}
 */
filebrowser.FileBrowser.prototype.decorateContentElement_ = function() {
  var list = new filebrowser.FileList();
  list.decorate(this.renderer_.getContentElement(this.element_));
  return list;
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileBrowser.prototype.handleBackAction = function(e) {
  alert('back');
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileBrowser.prototype.handleForwardAction = function(e) {
  alert('forward');
};
