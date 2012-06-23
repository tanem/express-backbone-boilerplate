define([
    'backbone',
    'collections/panels',
    'views/panel',
    'views/carousel'
], function (
    Backbone,
    PanelsCollection,
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

            var carouselView = new CarouselView({
                collection: this.panelsCollection
            });

            carouselView.render().$el.appendTo(this.el);

            this.panelsCollection.reset(data);

        },

        keydownListener: function (e) {
            
            switch (e.which) {
            case 8:
                this.panelsCollection.pop();
                return false;
            case 13:
                this.panelsCollection.create({
                    label: this.panelsCollection.models.length
                });
                return false;
            case 39:
                //this.carouselView.rotateRight();
                return false;
            case 37:
                //this.carouselView.rotateLeft();
                return false;
            }

        }

    });
   
    return AppView;
   
});