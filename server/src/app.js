'use strict';

var infector = require('infector'),
  Server = require('./server'),
  argv = require('optimist').argv;

var server = new Server({
  hostname: argv.HOSTNAME,
  port: argv.PORT,
  env: argv.ENV
});

server.on('listening', function(hostname, port, env){
  console.log('Server listening in %s mode at http://%s:%s/', env, hostname, port);
});

infector.registerModules({
  'panelController': { type: require('./controllers/panelController') },
  'panelModel': { type: require('./models/panelModel') },
  'panelRouter': { value: require('./routers/panelRouter') },
  'server': { value: server }
});

server.start();