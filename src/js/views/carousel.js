define([
    'backbone',
    'handlebars',
    'views/panel',
    'text!templates/carousel.handlebars'
], function (
    Backbone,
    Handlebars,
    PanelView,
    carouselTemplate
) {
   
    var CarouselView = Backbone.View.extend({
        
        initialize: function () {
            
            this.collection.bind('reset', this.addAll, this);

            this.setElement($(carouselTemplate).appendTo(this.options.$body));
            this.$carouselInner = this.$('.carousel-inner');

            this.collection.reset([
                { label: '1' },
                { label: '2' },
                { label: '3' },
                { label: '4' },
                { label: '5' },
                { label: '6' },
                { label: '7' },
                { label: '8' },
                { label: '9' }
            ]);

        },

        addOne: function (panelModel) {
            var panelView = new PanelView({ model: panelModel });
            this.$carouselInner.append(panelView.render().el);
        },

        addAll: function () {
            this.collection.each(this.addOne, this);
        }
    
    });
   
    return CarouselView;
   
});
