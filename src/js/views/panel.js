define([
    'backbone',
    'handlebars',
    'text!templates/panel.handlebars'
], function (
    Backbone,
    Handlebars,
    panelTemplate
) {
    
    var PanelView = Backbone.View.extend({
        
        initialize: function () {
            this.model.bind('change', this.render, this);
            this.template = Handlebars.compile(panelTemplate);
        },

        render: function () {
            this.setElement(this.template(this.model.toJSON()));
            return this;
        }
                
    });
    
    return PanelView;
   
});