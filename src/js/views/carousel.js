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

            this.carouselRotation = 0;
            this.panelRotation = 0;
            this.colours = util.colours;
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
            this.rotateByAmount(this.panelRotation);

        },

        removePanel: function (panelModel) {
            panelModel.destroy();
            this.adjustPanelTransformStrings();
        },

        getPanelColourClass: function () {
            return this.colours[Math.floor(Math.random() * this.coloursLength)];
        },

        adjustPanelTransformStrings: function () {

            var that = this,
                $panels = this.$('.panel'),
                numPanels = $panels.length,
                translate;

            // TODO: Make panel width (105) dynamic as well - specified in options passed to carousel?

            if (numPanels === 1) {
                this.panelRotation = translate = 0;
            } else {
                this.panelRotation = 360 / numPanels;
                translate = 105 / Math.tan(util.getRadians(this.panelRotation / 2));
            }

            $panels.each(function (i) {
                $(this).css('-webkit-transform', 'rotateY(' + (i * that.panelRotation) + 'deg) translateZ(' + translate + 'px)');
            });

        },

        // HMM - create nicer API?
        
        rotateByAmount: function (amount) {
            this.carouselRotation = amount;
            this.rotateCarousel();
        },

        rotateRight: function () {
            this.carouselRotation -= this.panelRotation;
            this.rotateCarousel();
        },

        rotateLeft: function () {
            this.carouselRotation += this.panelRotation;
            this.rotateCarousel();
        },

        rotateCarousel: function () {
            this.$carouselInner.css('-webkit-transform', 'rotateY(' + this.carouselRotation + 'deg)');
        }
    
    });
   
    return CarouselView;
   
});
