module.exports = function(grunt){
  grunt.registerTask('server', 'Starts the Node server.', function(){
    
    var http = require('http'),
      done = this.async(),
      port = this.args[0] || 3000,
      server = http.createServer(require('../server/src/app.js'));

    server.on('error', function(e){
      if (e.code == 'EADDRINUSE') {
        grunt.log.writeln('Address in use, assuming server started ok.');
        done();
      }
    });

    server.on('listening', function(){
      grunt.log.writeln('Opened server on port ' + port + '.');
      done();
    });

    server.listen(port);

  });
};