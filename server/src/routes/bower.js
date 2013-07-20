'use strict';

var path = require('path'),
  bowerPath = path.join(__dirname, '/../../../bower_components');

module.exports = function(app){

  app.get('/bower_components/*', function(req, res){
    res.sendfile(path.join(bowerPath, req.params[0]));
  });

};