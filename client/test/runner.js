'use strict';

var tests = Object.keys(window.__karma__.files).filter(function(file){
  return (/_spec\.js$/).test(file);
});

requirejs.config({

    // Karma serves files from `/base`.
    baseUrl: '/base/client/src/js',

    // Ask RequireJS to load these files (all our tests).
    deps: tests,

    // Start test run once RequireJS is done.
    callback: window.__karma__.start
    
});