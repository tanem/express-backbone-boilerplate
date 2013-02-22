define('panelsCollection', function(require){

  var Backbone = require('backbone'),
    PanelModel = require('panelModel');

  var PanelsCollection = Backbone.Collection.extend({
    url: '/api/panels',
    model: PanelModel
  });
    
  return PanelsCollection;
    
});