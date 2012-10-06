var Panel = require('../models/panel');

module.exports = function (app) {

    // Create.
    app.post('/api/panels', function (req, res) {
        
        var panel = new Panel();
        
        panel.save(function (err) {
            if (!err) {
                console.log('Panel [' + panel.id + '] created.');
            }
            res.send(panel);
        });

    });

    // Read.

    // Update.
    
    // Delete.
    app.delete('/api/panels/:id', function (req, res) {

        var id = req.params.id;
        
        Panel.destroy(id, function (err) {
            if (!err) {
                console.log('Panel [' + id + '] deleted.');
            }
            res.send('');
        });

    });

};