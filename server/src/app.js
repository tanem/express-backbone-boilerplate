'use strict';

var Server = require('./server'),
  argv = require('optimist').argv;

var server = new Server({
  hostname: argv.HOSTNAME,
  port: argv.PORT,
  env: argv.ENV
});

server.on('listening', function(hostname, port, env){
  console.log('Server listening in %s mode at http://%s:%s/', env, hostname, port);
});

server.start();