var path = require('path'),
  clientSrcPath = path.join(__dirname, '/../../../client/src');

module.exports = function(app){
  
  app.get('/client/src/css/*', function(req, res){
    res.sendfile(path.join(clientSrcPath, 'css', req.params[0]));
  });

  app.get('/client/src/font/*', function(req, res){
    res.sendfile(path.join(clientSrcPath, 'font', req.params[0]));
  });

  app.get('/client/src/js/*', function(req, res){
    res.sendfile(path.join(clientSrcPath, 'js', req.params[0]));
  });

  app.get('/client', function(req, res){
    res.sendfile(path.join(clientSrcPath, 'index.html'));
  });

};