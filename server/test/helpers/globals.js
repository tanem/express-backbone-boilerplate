'use strict';

var path = require('path');

global.Infector = require('infector');
global.expect = require('expect.js');
global.sinon = require('sinon');
global.noop = function(){};
global.source = function(filePath){
  return require(path.join(__dirname, '../../src', filePath));
};