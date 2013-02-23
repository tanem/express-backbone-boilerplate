var path = require('path'),
  docsPath = path.join(__dirname, '/../../_docs');

module.exports = function(app){
  
  app.get('/_docs/*', function(req, res){      
    
    var param = req.params[0];
    
    if (/\.(?:html|css)$/.test(param)) {
      res.sendfile(path.join(docsPath, param));
    } else {
      res.sendfile(path.join(docsPath, param, 'index.html'));
    }

  });

};