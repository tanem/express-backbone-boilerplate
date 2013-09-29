'use strict';

var Infector = require('infector'),
  argv = require('optimist').argv;

var infector = new Infector();

infector.register({
  panelController: { type: require('./controllers/panelController'), isSingleton: true },
  panelModel: { type: require('./models/panelModel'), isSingleton: true },
  panelRouter: { value: require('./routers/panelRouter') },
  server: { type: require('./server'), isSingleton: true },
  infector: { value: infector },
  hostname: { value: argv.HOSTNAME },
  port: { value: argv.PORT },
  env: { value: argv.ENV },
  date: { value: Date },
  db: { value: {} }
});

var server = infector.get('server');

server.on('listening', function(hostname, port, env){
  console.log('Server listening in %s mode at http://%s:%s/', env, hostname, port);
});

server.start();