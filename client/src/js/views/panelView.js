define(function(require){

  'use strict';

  var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    panelTemplate = require('text!templates/panel.handlebars');

  var PanelView = Backbone.View.extend({

    initialize: function(){
      this.model.bind('destroy', this.remove, this);
      this.template = Handlebars.compile(panelTemplate);
    },

    render: function(){
      this.setElement(this.template(this.model.toJSON()));
      return this;
    }

  });

  return PanelView;

});