define('panelModel', function(require){

    var Backbone = require('backbone');
   
    var PanelModel = Backbone.Model.extend({
        
        defaults: {
            'label': '?'
        }
        
    });
    
    return PanelModel;
    
});