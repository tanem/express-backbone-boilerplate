'use strict';

var _ = require('lodash');

var modules = {};

var injector = module.exports = {};

injector.registerModules = function(obj){
  _.extend(modules, obj);
};

injector.get = function(name){
  var module = modules[name];
  if (!module) throw new Error(name + ' has not been configured');
  if (module.type) return this._construct(module.type);
  else if (module.value) return module.value;
  else throw new Error(name + ' has an unknown return instruction');
};

injector._construct = function(Constructor){
  var args = [];
  _.each(Constructor.inject, function(key, i){
    args[i] = injector.get(key);
  });
  return this._beget(Constructor, args);
};

injector._beget = function(Constructor, args){
  function F() { Constructor.apply(this, args); }
  F.prototype = Constructor.prototype;
  return new F();
};

// TESTING API

injector._getModules = function(){
  return modules;
};

injector._clearModules = function(){
  modules = {};
};