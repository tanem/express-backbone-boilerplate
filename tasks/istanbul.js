'use strict';

module.exports = function(grunt){

  grunt.registerMultiTask('istanbul', 'Test server files as well as code coverage.', function(){
    
    var done = this.async(),
      options = this.options();

    grunt.util.spawn({
      cmd: 'istanbul',
      grunt: false,
      args: [
        options.command,
        '--default-excludes',
        '--report', options.reportType,
        '--dir', options.coverageOutputDir,
        './server/test/runner.js'
      ],
      opts: {
        stdio: 'inherit',
      }
    }, function(error, result, code){
      if (result && result.stderr) process.stderr.write(result.stderr);
      if (result && result.stdout) grunt.log.writeln(result.stdout);
      done(error);
    });
  
  });

};