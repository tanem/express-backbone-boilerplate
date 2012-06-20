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
        
        panelColours: [
            'violet',
            'indigo',
            'red',
            'blue',
            'green',
            'orange'
        ],

        initialize: function () {
            this.collection.bind('reset', this.addPanels, this);
            this.collection.bind('add', this.addPanel, this);
        },

        render: function () {
            this.setElement(carouselTemplate);
            this.$carouselInner = this.$('.carousel-inner');
            return this;
        },

        addPanels: function () {
            this.collection.each(this.addPanel, this);
        },

        addPanel: function (panelModel) {
            
            var panelView = new PanelView({
                model: panelModel
            });
            
            panelView.render().$el
                .appendTo(this.$carouselInner)
                .addClass(this.getPanelColourClass());

            this.adjustPanelTransformStrings();

        },

        getPanelColourClass: function () {
            return this.panelColours[Math.floor(Math.random() * this.panelColours.length)];
        },

        getRadians: function (deg) {
            var degPerRadian = 360 / (2 * Math.PI);
            return deg / degPerRadian;
        },

        adjustPanelTransformStrings: function () {

            var $panels = this.$('.panel'),
                numPanels = $panels.length,
                rotation,
                translate;

            // TODO: Make panel width (105) dynamic as well - specified in options passed to carousel?

            if (numPanels === 1) {
                rotation = translate = 0;
            } else {
                rotation = 360 / numPanels;
                translate = 105 / Math.tan(this.getRadians(rotation / 2));
            }

            $panels.each(function (i) {
                $(this).css('-webkit-transform', 'rotateY(' + (i * rotation) + 'deg) translateZ(' + translate + 'px)');
            });

        }
    
    });
   
    return CarouselView;
   
});
