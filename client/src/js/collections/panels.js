define([
    'backbone',
    'models/panel'
], function (
    Backbone,
    PanelModel
) {
   
    var PanelsCollection = Backbone.Collection.extend({
        url: '/api/panels',
        model: PanelModel
    });
    
    return PanelsCollection;
    
});