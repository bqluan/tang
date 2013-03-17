goog.provide('filebrowser.FileBrowser');

goog.require('filebrowser.BackButtonRenderer');
goog.require('filebrowser.File');
goog.require('filebrowser.FileBrowserRenderer');
goog.require('filebrowser.FileList');
goog.require('filebrowser.ForwardButtonRenderer');
goog.require('filebrowser.History');
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
 * @type {filebrowser.History}
 */
filebrowser.FileBrowser.prototype.history_;

/**
 * @return {string}
 */
filebrowser.FileBrowser.prototype.getCwd = function() {
  return this.cwd_;
};

/**
 * @param {string} cwd
 */
filebrowser.FileBrowser.prototype.setCwd = function(cwd) {
  if (cwd !== this.cwd_) {
    this.cwd_ = cwd;
    this.renderer_.setCwd(this.element_, path.basename(cwd) || '/');
    this.fileList_.setCwd(cwd);
  }
};

/**
 * @override
 */
filebrowser.FileBrowser.prototype.createDom = function() {
  this.element_ = this.renderer_.createDom(this);
};

/**
 * @override
 */
filebrowser.FileBrowser.prototype.enterDocument = function() {
  filebrowser.FileBrowser.superClass_.enterDocument.call(this);

  this.backButton_ = this.decorateBackElement_();
  this.backButton_.setParent(this);

  this.forwardButton_ = this.decorateForwardElement_();
  this.forwardButton_.setParent(this);

  this.fileList_ = this.decorateContentElement_();
  this.fileList_.setParent(this);

  this.getHandler().listen(
    this, filebrowser.File.EventType.OPEN, this.handleFileOpen);

  this.history_ = this.createBrowsingHistory_();
  this.history_.push(this.cwd_);
};

/**
 * @return {filebrowser.History}
 */
filebrowser.FileBrowser.prototype.createBrowsingHistory_ = function() {
  var history = new filebrowser.History();
  this.getHandler().listen(
    history, goog.events.EventType.CHANGE, this.handleHistoryChange);
  return history;
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
  var list = new filebrowser.FileList(this.cwd_);
  list.decorate(this.renderer_.getContentElement(this.element_));
  return list;
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileBrowser.prototype.handleHistoryChange = function(e) {
  /** @type {filebrowser.History} */
  var history = e.target;
  this.backButton_.setEnabled(history.canMoveBack());
  this.forwardButton_.setEnabled(history.canMoveForward());
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileBrowser.prototype.handleBackAction = function(e) {
  if (this.history_.canMoveBack()) {
    this.history_.moveBack();
    this.setCwd(this.history_.peek());
  }
};

/**
 * @param {goog.events.BrowserEvent} e
 */
filebrowser.FileBrowser.prototype.handleForwardAction = function(e) {
  if (this.history_.canMoveForward()) {
    this.history_.moveForward();
    this.setCwd(this.history_.peek());
  }
};

/**
 * @param {goog.events.Event} e
 */
filebrowser.FileBrowser.prototype.handleFileOpen = function(e) {
  /** @type {filebrowser.File} */
  var file = e.target;
  if (file.getStats().isDirectory()) {
    var dirname = file.getFilename();
    this.setCwd(dirname);
    this.history_.push(dirname);
  }
};
