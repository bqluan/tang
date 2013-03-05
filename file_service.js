var express = require('express'),
    fs = require('fs'),
    path = require('path');

var parseFile = function(req, res, next) {
  req.file = path.join(__dirname, 'disk', req.params[0]);
  next();
};

var parseBody = function(req, res, next) {
  var chunks = [];
  req.on('data', function(chunk) {
    chunks.push(chunk);
  });
  req.on('end', function() {
    req.body = Buffer.concat(chunks);
    next();
  });
};

var lstat = function(req, res, next) {
  fs.lstat(req.file, function(err, stats) {
    if (err) {
      return next(err);
    }
    req.stats = stats;
    res.set('X-Stats-Mode', stats.mode);
    res.set('X-Stats-Size', stats.size);
    res.set('X-Stats-MTime', stats.mtime.getTime());
    next();
  });
};

var downloadFile = function(req, res, next) {
  if (!req.stats.isFile()) {
    return next();
  }
  if (req.method === 'HEAD') {
    return res.send(200);
  }
  res.download(req.file, function(err) {
    if (err) next(err);
  });
};

var readDir = function(req, res, next) {
  if (!req.stats.isDirectory()) {
    return next();
  }
  if (req.method === 'HEAD') {
    return res.send(200);
  }
  fs.readdir(req.file, function(err, files) {
    err ? next(err) : res.json(files);
  });
};

var mkdir = function(req, res, next) {
  req.get('X-Directory') ? mkdir_(req, res, next) : next();
};

var mkdir_ = function(req, res, next) {
  fs.mkdir(req.file, function(err) {
    err ? next(err) : res.send(201);
  });
};

var write = function(req, res, next) {
  fs.writeFile(req.file, req.body, function(err) {
    err ? next(err) : res.send(201);
  });
};

var error = function(err, req, res, next) {
  res.set('X-Error-Errno', err.errno)
     .set('X-Error-Code', err.code)
     .status(400)
     .end(err.message || '');
};

var new_error = function(errno, code, message) {
  return {
    errno: errno,
    code: code,
    message: message
  };
};

var notExist = function(req, res, next) {
  var filename = path.join(req.file, req.files.file.name);
  fs.exists(filename, function(exists) {
    exists ? next(new_error(47, 'EEXIST', 'file already exists')) : next();
  });
};

var saveFile = function(req, res, next) {
  fs.createReadStream(req.files.file.path).pipe(
    fs.createWriteStream(path.join(req.file, req.files.file.name))
      .on('close', function() {
        res.send(201);
      })
      .on('error', function(err) {
        next(err);
      }));
};

var app = module.exports = express();

app.put('/*', parseFile, parseBody, mkdir, write, error);
app.get('/*', parseFile, lstat, readDir, downloadFile, error);
app.head('/*', parseFile, lstat, readDir, downloadFile, error);
app.post('/*', parseFile, express.multipart(), notExist, saveFile, error);

if (!module.parent) {
  app.listen(1337);
  console.log('File service started on port 1337');
}
