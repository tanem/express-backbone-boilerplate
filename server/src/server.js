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
  this.configure();
};

util.inherits(Server, events.EventEmitter);

Server.prototype.configure = function(){
    
  this.app.use(express.static(path.join(__dirname, '../../client/src')));
  this.app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
  this.app.use('/src', express.static(path.join(__dirname, '../../client/src')));
  require('./routes/api')(this.app);
  
  if (this.env === 'development') {

    // Make `SpecRunner.html the index page.
    this.app.get(/^\/test$/, function(req, res, next){
      req.url = req.originalUrl + '/SpecRunner.html';
      next();
    });

    this.app.use('/test', express.static(path.join(__dirname, '../../client/test')));
    
    // Make `README.md.html` the index page.
    this.app.get(/^\/docs$/, function(req, res, next){
      req.url = req.originalUrl + '/README.md.html';
      next();
    });

    // Rewrite the Docker generated js & css urls so they get picked up
    // correctly by express.static.
    this.app.get(/^\/doc-\w+\.(?:js|css)$/, function(req, res, next){
      req.url = '/docs' + req.originalUrl;
      next();
    });

    this.app.use('/docs', express.static(path.join(__dirname, '../../_docs')));
  }

};

Server.prototype.start = function(){
  var server = this;
  http.createServer(this.app).listen(this.port, this.hostname, function(){
    // Setting port again here since we could have started on a random port.
    server.port = this.address().port;
    server.emit('listening', server.hostname, server.port, server.env);
  });
};