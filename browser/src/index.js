goog.provide('main');

goog.require('filebrowser.FileBrowser');

main = function() {
  new filebrowser.FileBrowser('/').render();
};

main();
