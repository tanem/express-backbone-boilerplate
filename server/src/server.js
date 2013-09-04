'use strict';

var http = require('http'),
  path = require('path'),
  util = require('util'),
  events = require('events'),
  _ = require('lodash'),
  express = require('express');

var controllerRegistry = {};

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
  
  // TODO: auto generate from files present in routers dir.
  this._generateRoutes('./routers/panelRouter');
  
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
  
  // Like Crockford's `beget`, but this version allows us to essentially
  // call the controller constructor with an array of args. This makes
  // life easier when injecting controller dependencies.
  function createController(Constructor, args) {
    function F() {
      Constructor.apply(this, args);
    }
    F.prototype = Constructor.prototype;
    return new F();
  }

  var server = this,
    router = require(path);
  
  Object.keys(router).forEach(function(route){
    
    var urlInfo = route.split(' '),
      method = urlInfo[0],
      url = urlInfo[1],
      controllerInfo = router[route],
      controller = controllerRegistry[controllerInfo.controller],
      Controller;

    // If the controller instance doesn't exist in the registry, create a
    // new one and add it to the registry.
    if (!controller) {
      Controller = require('./controllers/' + controllerInfo.controller);

      // For now we're assuming only models are required by controllers.
      _.each(Controller.inject, function(value, index, array){
        var Model = require('./models/' + value);
        array[index] = new Model();
      });
      controller = createController(Controller, Controller.inject);
      controllerRegistry[controllerInfo.controller] = controller;
    }

    server.app[method](url, controller[controllerInfo.action].bind(controller));

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