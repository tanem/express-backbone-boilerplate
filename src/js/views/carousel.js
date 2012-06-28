define([
    'backbone',
    'handlebars',
    'core/eventMediator',
    'core/util',
    'views/panel',
    'text!templates/carousel.handlebars'
], function (
    Backbone,
    Handlebars,
    eventMediator,
    util,
    PanelView,
    carouselTemplate
) {
   
    var CarouselView = Backbone.View.extend({

        initialize: function () {

            this.collection.bind('reset', this.addPanels, this);
            this.collection.bind('add', this.addPanel, this);
            this.collection.bind('remove', this.removePanel, this);

            eventMediator.subscribe('rightArrow', function () {
                this.carouselRotation -= this.panelRotation;
                this.rotate(this.carouselRotation);
            }, this);

            eventMediator.subscribe('leftArrow', function () {
                this.carouselRotation += this.panelRotation;
                this.rotate(this.carouselRotation);
            }, this);

            this.carouselRotation = 0;
            this.panelRotation = 0;

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
                .css('background-color', util.getRandomRGBA(this.options.panelOpacity));

            this.repositionPanels();
            this.carouselRotation = this.panelRotation;
            this.rotate();

        },

        removePanel: function (panelModel) {
            panelModel.destroy();
            this.repositionPanels();
            this.carouselRotation = this.panelRotation;
            this.rotate();
        },

        repositionPanels: function () {

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

        rotate: function () {
            this.$carouselInner.css('-webkit-transform', 'rotateY(' + this.carouselRotation + 'deg)');
        }
    
    });
   
    return CarouselView;
   
});
