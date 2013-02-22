define('appView', function(require){

  var Backbone = require('backbone'),
    PanelsCollection = require('panelsCollection'),
    eventMediator = require('eventMediator'),
    util = require('util'),
    PanelView = require('panelView'),
    CarouselView = require('carouselView');
   
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
          eventMediator.publish('delete');
          return false;
        case keyMap.enter:
          eventMediator.publish('enter');
          return false;
        case keyMap.rightArrow:
          eventMediator.publish('rightArrow');
          return false;
        case keyMap.leftArrow:
          eventMediator.publish('leftArrow');
          return false;
      }

    }

  });
   
  return AppView;
   
});