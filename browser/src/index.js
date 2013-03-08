goog.provide('main');

goog.require('filebrowser.File');

main = function() {
  var stats = new fs.Stats(fs.Stats.Mode.REGULAR_FILE);
  new filebrowser.File('/file.txt', stats).render();
  stats = new fs.Stats(fs.Stats.Mode.DIRECTORY);
  new filebrowser.File('/dir', stats).render();
};
