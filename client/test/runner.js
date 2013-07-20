'use strict';

var tests = Object.keys(window.__karma__.files).filter(function(file){
  return (/_spec\.js$/).test(file);
});

requirejs.config({

    // Karma serves files from `/base`.
    baseUrl: '/base/client/src/js',

    paths: {
      modernizr: '/base/bower_components/modernizr/modernizr',
      jquery: '/base/bower_components/jquery/jquery',
      underscore: '/base/bower_components/underscore/underscore',
      backbone: '/base/bower_components/backbone/backbone',
      handlebars: '/base/bower_components/handlebars/handlebars',
      text: '/base/bower_components/requirejs-text/text'
    },

    // Ask RequireJS to load these files (all our tests).
    deps: tests,

    // Start test run once RequireJS is done.
    callback: window.__karma__.start

});