define([
    'backbone',
    'collections/panels',
    'core/eventMediator',
    'core/util',
    'views/panel',
    'views/carousel'
], function (
    Backbone,
    PanelsCollection,
    eventMediator,
    util,
    PanelView,
    CarouselView
) {
   
    var AppView = Backbone.View.extend({

        events: {
            'keydown': 'keydownListener'
        },

        initialize: function () {

            // TODO: pull this from the server?
            
            this.renderCarousel([
                { label: '1' },
                { label: '2' },
                { label: '3' }
            ]);

        },

        renderCarousel: function (data) {
            
            var panelsCollection = new PanelsCollection();

            // TODO: add panel width as an option.
            
            var carouselView = new CarouselView({
                panelOpacity: 0.9,
                collection: panelsCollection
            });

            carouselView.render().$el.appendTo(this.el);

            panelsCollection.reset(data);

        },

        keydownListener: function (e) {
            
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