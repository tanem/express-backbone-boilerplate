'use strict';

var _ = require('lodash');

var registry = {};
var injector = module.exports = {};
  
injector.create = function(path){
  var Module, args;
  if (!registry[path]) {
    Module = require(path);
    args = [];
    _.each(Module.inject, function(dependency, i){
      // Assuming models for now...
      var Dependency = require('./models/' + dependency);
      args[i] = new Dependency();
    });
    registry[path] = this._construct(Module, args);
  }
  return registry[path];
};

// Like Crockford's `beget`, but this version allows us to call `Constructor`
// with an array of args. This makes life easier when injecting dependencies.
injector._construct = function(Constructor, args){
  function F() { Constructor.apply(this, args); }
  F.prototype = Constructor.prototype;
  return new F();
};