define(function(require){

  'use strict';
  
  var _ = require('underscore'),
    Backbone = require('backbone');
  
  // A simple event mediator, see http://backbonejs.org/#Events
  return _.clone(Backbone.Events);

});