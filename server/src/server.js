'use strict';

var http = require('http'),
  path = require('path'),
  util = require('util'),
  events = require('events'),
  _ = require('lodash'),
  express = require('express');

var Server = module.exports = function(options){
  events.EventEmitter.call(this);
  options = options || {};
  this.hostname = options.hostname || '127.0.0.1';
  this.port = _.isUndefined(options.port) ? 3000 : +options.port;
  this.env = options.env || 'development';
  this.app = express();
  this._configure();
};

util.inherits(Server, events.EventEmitter);

Server.prototype._configure = function(){
    
  this.app.use(express.static(path.join(__dirname, '../../client/src')));
  this.app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
  this.app.use('/src', express.static(path.join(__dirname, '../../client/src')));
  
  this._generateRoutes('./routes/panelRoutes');
  
  if (this.env === 'development') {

    // Make `SpecRunner.html the index page.
    this.app.get(/^\/test$/, function(req, res, next){
      req.url = req.originalUrl + '/SpecRunner.html';
      next();
    });

    this.app.use('/test', express.static(path.join(__dirname, '../../client/test')));
    
    // Make `README.md.html` the index page.
    this.app.get(/^\/docs$/, function(req, res){
      res.redirect('/docs/README.md.html');
    });

    this.app.use('/docs', express.static(path.join(__dirname, '../../_docs')));
  }

};

Server.prototype._generateRoutes = function(path){
  
  var server = this,
    routes = require(path);
  
  Object.keys(routes).forEach(function(route){
    
    var urlInfo = route.split(' '),
      method = urlInfo[0],
      url = urlInfo[1],
      controllerInfo = routes[route],
      controller = require('./controllers/' + controllerInfo.controller);

    server.app[method](url, controller[controllerInfo.action]);

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