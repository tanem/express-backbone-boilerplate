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

        initialize: function () {
            
            this.renderCarousel([
                { label: '1' },
                { label: '2' },
                { label: '3' },
                { label: '4' },
                { label: '5' },
                { label: '6' },
                { label: '7' },
                { label: '8' },
                { label: '9' },
                { label: '10' }
            ]);

        },

        renderCarousel: function (data) {
            
            var panelsCollection = new PanelsCollection();

            this.carouselView = new CarouselView({
                collection: panelsCollection
            });

            this.carouselView.render().$el.appendTo(this.el);

            panelsCollection.reset(data);

        }

    });
   
    return AppView;
   
});