module.exports = function(grunt){
  grunt.registerTask('server', 'Starts the Node server.', function(){
    
    var done = this.async(),
      Server = require('../server/src/server.js');

    var server = new Server({
      port: grunt.option('NODE_PORT'),
      env: grunt.option('NODE_ENV')
    });

    server.on('listening', function(port, env){
      grunt.log.writeln('Opened server in ' + env + ' mode on port ' + port + '.');
      done();
    });

    server.start();

  });
};