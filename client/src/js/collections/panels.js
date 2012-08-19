define([
    'backbone',
    'models/panel'
], function (
    Backbone,
    PanelModel
) {
   
    var PanelsCollection = Backbone.Collection.extend({
        
        model: PanelModel
        
    });
    
    return PanelsCollection;
    
});