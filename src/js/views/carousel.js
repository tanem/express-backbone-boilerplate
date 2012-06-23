define([
    'backbone',
    'handlebars',
    'core/util',
    'views/panel',
    'text!templates/carousel.handlebars'
], function (
    Backbone,
    Handlebars,
    util,
    PanelView,
    carouselTemplate
) {
   
    var CarouselView = Backbone.View.extend({

        initialize: function () {

            this.collection.bind('reset', this.addPanels, this);
            this.collection.bind('add', this.addPanel, this);
            this.collection.bind('remove', this.removePanel, this);

            this.colours = util.getColours();
            this.coloursLength = this.colours.length;

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

        removePanel: function (panelModel) {
            panelModel.destroy();
            this.adjustPanelTransformStrings();
        },

        getPanelColourClass: function () {
            return this.colours[Math.floor(Math.random() * this.coloursLength)];
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
                translate = 105 / Math.tan(util.getRadians(rotation / 2));
            }

            $panels.each(function (i) {
                $(this).css('-webkit-transform', 'rotateY(' + (i * rotation) + 'deg) translateZ(' + translate + 'px)');
            });

        }
    
    });
   
    return CarouselView;
   
});
