define([
    'backbone',
    'collections/panels',
    'core/util',
    'views/panel',
    'views/carousel'
], function (
    Backbone,
    PanelsCollection,
    util,
    PanelView,
    CarouselView
) {
   
    var AppView = Backbone.View.extend({

        events: {
            'keydown': 'keydownListener'
        },

        initialize: function () {

            this.renderCarousel([
                { label: '1' },
                { label: '2' },
                { label: '3' }
            ]);

        },

        renderCarousel: function (data) {
            
            this.panelsCollection = new PanelsCollection();

            this.carouselView = new CarouselView({
                collection: this.panelsCollection
            });

            this.carouselView.render().$el.appendTo(this.el);

            this.panelsCollection.reset(data);

        },

        keydownListener: function (e) {
            
            var keyMap = util.keyMap;

            switch (e.which) {
            case keyMap.del:
                this.panelsCollection.pop();
                return false;
            case keyMap.enter:
                this.panelsCollection.create({
                    label: this.panelsCollection.models.length
                });
                return false;
            case keyMap.rightArrow:

                // TODO: USE THE MEDIATOR!!!!
                // eventMediator.publish('carousel:rotateRight');

                this.carouselView.rotateRight();
                return false;
            case keyMap.leftArrow:
                this.carouselView.rotateLeft();
                return false;
            }

        }

    });
   
    return AppView;
   
});