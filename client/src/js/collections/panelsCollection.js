define(function(require){

  'use strict';

  var Backbone = require('backbone'),
    PanelModel = require('models/panelModel');

  var PanelsCollection = Backbone.Collection.extend({
    url: '/api/panels',
    model: PanelModel
  });
    
  return PanelsCollection;
    
});