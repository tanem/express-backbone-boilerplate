define([
  'jquery',
  'underscore',
  'backbone',
  'models/panel'
], function(
  $,
  _,
  Backbone,
  PanelModel
){

  var PanelsCollection = Backbone.Collection.extend({
    url: '/api/panels',
    model: PanelModel
  });
    
  return PanelsCollection;
    
});