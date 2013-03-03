define([
  'jquery',
  'underscore',
  'backbone',
  'collections/panels',
  'core/eventMediator',
  'core/util',
  'views/panel',
  'views/carousel'
], function(
  $,
  _,
  Backbone,
  PanelsCollection,
  eventMediator,
  util,
  PanelView,
  CarouselView
){
   
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