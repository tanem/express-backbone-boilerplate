'use strict';

var _ = require('lodash');

/**
 * Expose `injector`.
 */

var injector = module.exports = {};

/**
 * Holds the registered modules.
 */

injector.modules = {};

/**
 * Registers modules and defines how they are to be returned. Objects should
 * define required dependencies using the registered names.
 *
 * There are two ways a module can be obtained from the injector:
 *
 * * `type`: a new instance will be created via `new` and returned.
 * * `value`: the registered value will be returned.
 *
 * Example:
 *
 * ```js
 * injector.registerModules({
 *   'moduleOne': { type: require('./moduleOne') },
 *   'moduleTwo': { value: require('./moduleTwo') }
 * });
 * ```
 *
 * @param {Object} obj Modules to register.
 * @api public
 */

injector.registerModules = function(obj){
  _.extend(this.modules, obj);
};

/**
 * Returns a module.
 *
 * Example:
 *
 * ```js
 * injector.get('moduleOne');
 * ```
 *
 * @param {String} name The name of the module to return.
 * @return {Object} The module instance or value.
 * @api public
 */

injector.get = function(name){
  var module = this.modules[name];
  if (!module) throw new Error(name + ' has not been configured');
  if (module.type) return this._construct(module.type);
  else if (module.value) return module.value;
  else throw new Error(name + ' has an unknown return instruction');
};

/**
 * Constructs an object and injects it's dependencies.
 *
 * @param {Function} Constructor
 * @return {Object}
 * @api private
 */

injector._construct = function(Constructor){
  var args = [];
  _.each(Constructor.inject, function(key, i){
    args[i] = injector.get(key);
  });
  return this._beget(Constructor, args);
};

/**
 * Constructs an object with the given `args` array. Based on
 * [Crockford's beget](http://javascript.crockford.com/prototypal.html).
 *
 * @param {Function} Constructor
 * @param {Array} args
 * @return {Object}
 * @api private
 */
injector._beget = function(Constructor, args){
  function F() { Constructor.apply(this, args); }
  F.prototype = Constructor.prototype;
  return new F();
};