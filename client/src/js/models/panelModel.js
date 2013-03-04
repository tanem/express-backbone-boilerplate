define([
  'jquery',
  'underscore',
  'backbone'
], function(
  $,
  _,
  Backbone
){
   
  var PanelModel = Backbone.Model.extend({
    defaults: {
      'label': '?'
    }    
  });
    
  return PanelModel;
    
});