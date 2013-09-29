'use strict';

var http = require('http'),
  path = require('path'),
  util = require('util'),
  events = require('events'),
  fs = require('fs'),
  _ = require('lodash'),
  express = require('express');

var Server = module.exports = function Server(hostname, port, env, infector) {
  events.EventEmitter.call(this);
  this.hostname = hostname || '127.0.0.1';
  this.port = _.isUndefined(port) ? 3000 : +port;
  this.env = env || 'development';
  this.infector = infector;
  this.app = express();
  this._configure();
};

Server.infect = ['hostname', 'port', 'env', 'infector'];

util.inherits(Server, events.EventEmitter);

Server.prototype._configure = function(){
  
  var server = this;

  this.app.use(express['static'](path.join(__dirname, '../../client/src')));
  this.app.use('/bower_components', express['static'](path.join(__dirname, '../../bower_components')));
  this.app.use('/src', express['static'](path.join(__dirname, '../../client/src')));

  fs.readdir(path.join(__dirname, 'routers'), function(err, files){
    if (err) throw err;
    _.each(files, function(file){
      if (/.*Router\.js$/.test(file)) server._generateRoutes(file.split('.js')[0]);
    });
  });

  if (this.env === 'development') {

    // Make `SpecRunner.html the index page.
    this.app.get(/^\/test$/, function(req, res, next){
      req.url = req.originalUrl + '/SpecRunner.html';
      next();
    });

    this.app.use('/test', express['static'](path.join(__dirname, '../../client/test')));
    
    // Make `README.md.html` the index page.
    this.app.get(/^\/docs$/, function(req, res){
      res.redirect('/docs/README.md.html');
    });

    this.app.use('/docs', express['static'](path.join(__dirname, '../../_docs')));
  }

};

Server.prototype._generateRoutes = function(routerPath){

  var server = this,
    router = require('./routers/' + routerPath);

  Object.keys(router).forEach(function(route){
    
    var urlInfo = route.split(' '),
      method = urlInfo[0],
      url = urlInfo[1];
    
    var controllerInfo = router[route],
      controller = server.infector.get(controllerInfo.controller),
      action = controllerInfo.action;

    server.app[method](url, controller[action].bind(controller));

  });

};

Server.prototype.start = function(){
  var server = this;
  http.createServer(this.app).listen(this.port, this.hostname, function(){

    // Setting port again here since we could have started on a random port.
    server.port = this.address().port;
    server.emit('listening', server.hostname, server.port, server.env);
  });
};