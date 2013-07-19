define(function(require){

  'use strict';

  var Backbone = require('backbone'),
    PanelsCollection = require('collections/panelsCollection'),
    eventMediator = require('core/eventMediator'),
    util = require('core/util'),
    CarouselView = require('views/carouselView');
    
  var AppView = Backbone.View.extend({

    events: {
      'keydown': 'keydownListener'
    },

    initialize: function(){
                        
      var carouselView = new CarouselView({
        panelOpacity: 0.9,
        collection: new PanelsCollection()
      });

      carouselView.render().$el.appendTo(this.el);

    },

    keydownListener: function(e){
            
      var keyMap = util.keyMap;

      switch (e.which) {
        case keyMap.del:
          eventMediator.trigger('delete');
          return false;
        case keyMap.enter:
          eventMediator.trigger('enter');
          return false;
        case keyMap.rightArrow:
          eventMediator.trigger('rightArrow');
          return false;
        case keyMap.leftArrow:
          eventMediator.trigger('leftArrow');
          return false;
      }

    }

  });
   
  return AppView;
   
});