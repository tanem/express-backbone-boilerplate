define(['backbone'], function(Backbone){
   
  var PanelModel = Backbone.Model.extend({
    defaults: {
      'label': '?'
    }    
  });
    
  return PanelModel;
    
});