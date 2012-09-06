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

            this.collection.bind('reset', this._addPanels, this);
            this.collection.bind('add', this._addPanel, this);
            this.collection.bind('remove', this._removePanel, this);

            eventMediator.subscribe('rightArrow', this._rightArrowHandler, this);
            eventMediator.subscribe('leftArrow', this._leftArrowHandler, this);

            this.carouselRotation = 0;
            this.panelRotation = 0;

        },

        render: function () {
            this.setElement(carouselTemplate);
            this.$carouselInner = this.$('.carousel-inner');
            return this;
        },

        _rightArrowHandler: function () {
            this.carouselRotation -= this.panelRotation;
            this._rotate(this.carouselRotation);
        },

        _leftArrowHandler: function () {
            this.carouselRotation += this.panelRotation;
            this._rotate(this.carouselRotation);
        },

        _addPanels: function () {
            this.collection.each(this._addPanel, this);
        },

        _addPanel: function (panelModel) {
            
            var panelView = new PanelView({
                model: panelModel
            });
            
            panelView.render().$el
                .appendTo(this.$carouselInner)
                .css('background-color', util.getRandomRGBA(this.options.panelOpacity));

            this._repositionPanels();
            this.carouselRotation = this.panelRotation;
            this._rotate();

        },

        _removePanel: function (panelModel) {
            panelModel.destroy();
            this._repositionPanels();
            this.carouselRotation = this.panelRotation;
            this._rotate();
        },

        _repositionPanels: function () {

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

            $panels.each(this._adjustPanelTransformString(this, translate));

        },

        _rotate: function () {
            this.$carouselInner.css('-webkit-transform', 'rotateY(' +
                this.carouselRotation + 'deg)');
        },

        // TODO: add transforms for other browsers.
        _adjustPanelTransformString: function (carouselView, translate) {
            return function (i) {
                var rotateY = i * carouselView.panelRotation;
                $(this).css('-webkit-transform', 'rotateY(' + rotateY +
                    'deg) translateZ(' + translate + 'px)');
            };
        }
    
    });
   
    return CarouselView;
   
});
