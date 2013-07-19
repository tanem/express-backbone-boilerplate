'use strict';

var http = require('http'),
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
  require('./routes/client')(this.app);
  require('./routes/api')(this.app);
  if (this.env === 'development') {
    require('./routes/test')(this.app);
    require('./routes/docs')(this.app);
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