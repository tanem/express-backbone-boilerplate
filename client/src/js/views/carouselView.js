define(function(require){

  'use strict';

  var Modernizr = require('modernizr'),
    Backbone = require('backbone'),
    eventMediator = require('core/eventMediator'),
    util = require('core/util'),
    PanelView = require('views/panelView'),
    carouselTemplate = require('text!templates/carousel.handlebars');

  var CarouselView = Backbone.View.extend({

    _addPanel: function(panelModel){
          
      var panelView = new PanelView({
        model: panelModel
      });
          
      panelView.render().$el
        .appendTo(this.$carouselInner)
        .css('background-color', util.getRandomRGBA(this.options.panelOpacity));

      this._repositionPanels();
      this.carouselRotation = this.panelRotation;
      this._rotate();

    },

    _addPanels: function(){
      this.collection.each(this._addPanel, this);
    },

    _adjustPanelTransformString: function(carouselView, translate){
      return function(i){
        var rotateY = i * carouselView.panelRotation;
        this.style[Modernizr.prefixed('transform')] = 'rotateY(' + rotateY +
          'deg) translateZ(' + translate + 'px)';
      };
    },

    _deleteHandler: function(){
      this.collection.pop();
    },

    _enterHandler: function(){
      var label = this.collection.models.length + 1;
      this.collection.create({
        label: '' + label
      });
    },

    _leftArrowHandler: function(){
      this.carouselRotation -= this.panelRotation;
      this._rotate(this.carouselRotation);
    },

    _rightArrowHandler: function(){
      this.carouselRotation += this.panelRotation;
      this._rotate(this.carouselRotation);
    },

    _removePanel: function(panelModel){
      panelModel.destroy();
      this._repositionPanels();
      this.carouselRotation = this.panelRotation;
      this._rotate();
    },

    _repositionPanels: function(){

      var $panels = this.$('.panel'),
        numPanels = $panels.length,
        translate;

      if (numPanels === 1) {
        this.panelRotation = translate = 0;
      } else {
        this.panelRotation = 360 / numPanels;
        translate = 105 / Math.tan(util.getRadians(this.panelRotation / 2));
      }

      $panels.each(this._adjustPanelTransformString(this, translate));

    },

    _rotate: function(){
      this.carouselInner.style[Modernizr.prefixed('transform')] = 'rotateY(' +
        this.carouselRotation + 'deg)';
    },

    initialize: function(){

      this.collection.bind('reset', this._addPanels, this);
      this.collection.bind('add', this._addPanel, this);
      this.collection.bind('remove', this._removePanel, this);

      eventMediator.on('delete', this._deleteHandler, this);
      eventMediator.on('enter', this._enterHandler, this);
      eventMediator.on('rightArrow', this._rightArrowHandler, this);
      eventMediator.on('leftArrow', this._leftArrowHandler, this);

      this.carouselRotation = 0;
      this.panelRotation = 0;

    },

    render: function(){
      this.setElement(carouselTemplate);
      this.$carouselInner = this.$('.carousel-inner');
      this.carouselInner = this.$carouselInner.get(0);
      return this;
    }
  
  });
 
  return CarouselView;
   
});