var path = require('path'),
  clientSrcPath = path.join(__dirname, '/../../client/src');

exports.css = function ( req, res ) {
  res.sendfile(path.join(clientSrcPath, 'css', req.params[0]));
};

exports.js = function ( req, res ) {
  res.sendfile(path.join(clientSrcPath, 'js', req.params[0]));
};

exports.font = function ( req, res ) {
  res.sendfile(path.join(clientSrcPath, 'font', req.params[0]));
};

exports.index = function ( req, res ) {
  res.sendfile(path.join(clientSrcPath, 'index.html'));
};