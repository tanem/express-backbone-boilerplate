'use strict';

var grunt = require('grunt'),
  Mocha = require('mocha'),
  argv = require('optimist').argv;

require('./globals');

var mocha = new Mocha({
  reporter: argv.reporter,
  ui: argv.ui
});

function run(cb) {
  var files = grunt.file.expand(argv.files);
  files.forEach(function (file) {
    mocha.addFile(file);
  });
  cb();
}

run(function(err){
  if (err) throw err;
  mocha.run(function(failures){
    process.exit(failures);
  });
});