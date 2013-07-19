define(function(require){

  'use strict';

  var Backbone = require('backbone');

  var PanelModel = Backbone.Model.extend({
    defaults: {
      'label': '?'
    }
  });

  return PanelModel;

});