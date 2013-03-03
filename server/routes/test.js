var path = require('path'),
  clientTestPath = path.join(__dirname, '/../../client/test');

module.exports = function(app){

  app.get('/client/test/*.js', function(req, res){
    res.sendfile(path.join(clientTestPath, req.params[0] + '.js'));
  });
  
  app.get('/client/test/_lib/*', function(req, res){
    res.sendfile(path.join(clientTestPath, '_lib', req.params[0]));
  });
  
  app.get('/client/test', function(req, res){
    res.sendfile(path.join(clientTestPath, '_lib/index.html'));
  });

};