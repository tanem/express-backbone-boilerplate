define([
  'jquery',
  'underscore',
  'backbone'
], function(
  $,
  _,
  Backbone
){
  
  // A simple event mediator, see http://backbonejs.org/#Events
  return _.clone(Backbone.Events);

});