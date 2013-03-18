goog.provide('main');

//goog.require('filebrowser.FileBrowser');
goog.require('numbers.Numbers');

var main = function() {
  //new filebrowser.FileBrowser('/').render();
  new numbers.Numbers('/1.csv').render();
};
goog.exportSymbol('main', main);
