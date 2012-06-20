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
            
            this.carouselView = new CarouselView({
                collection: new PanelsCollection(),
                $body: $('body')
            });

        }

    });
   
    return AppView;
   
});