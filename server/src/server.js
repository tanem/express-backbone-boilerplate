var util = require('util'),
  events = require('events'),
  express = require('express');

var Server = module.exports = function(options){
  options = options || {};
  this.port = options.port || 3000;
  this.env = options.env || 'development';
  this.app = express();
  this.configure(this.app);
};

util.inherits(Server, events.EventEmitter);

Server.prototype.configure = function(app){
  
  this.app.configure(function(){
    require('./routes/client')(app);
    require('./routes/api')(app);
  });

  if (this.env === 'development') {
    this.app.configure('development', function(){
      require('./routes/test')(app);
      require('./routes/docs')(app);
    });
  }

};

Server.prototype.start = function(){
  var server = this;
  this.app.listen(this.port, function(){
    server.emit('listening', server.port, server.env);
  });
};