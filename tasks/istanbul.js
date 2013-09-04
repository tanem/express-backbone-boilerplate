'use strict';

var path = require('path');

module.exports = function(grunt){

  grunt.registerMultiTask('istanbul', 'Test server files as well as code coverage.', function(){

    var done = this.async(),
      options = this.options();

    grunt.util.spawn({
      cmd: path.join(__dirname, '../node_modules/.bin/istanbul'),
      grunt: false,
      args: [
        options.command,
        '--root', options.root,
        '--no-default-excludes',
        '--report', options.reportType,
        '--dir', options.coverageOutputDir,
        options.runner,
        '--',
        '--files', options.mochaFiles,
        '--reporter', options.mochaReporter,
        '--ui', options.mochaUi
      ],
      opts: {
        stdio: 'inherit'
      }
    }, function(error){
      done(error);
    });

  });

};
