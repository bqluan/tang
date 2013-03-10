goog.provide('main');

goog.require('filebrowser.FileBrowser');
goog.require('fs');

var main = function() {
  new filebrowser.FileBrowser('/').render();
};
goog.exportSymbol('main', main);
