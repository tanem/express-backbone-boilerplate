define([
  'jquery',
  'underscore',
  'backbone',
  'models/panelModel'
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