var Panel = require('../models/panel');

module.exports = function (app) {

    // Get all panels in the DB.
    /*app.get('/api/panels', function (req, res) {
        Panel.all(function (err, arr) {
            if (!err) {
                res.send(arr);
            }
        });
    });*/

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

//var panels = require('../data/panels');
/*
exports.create = function (req, res) {
    var panel = { label: panels.counter++ };
    panels.data.push(panel);
    return res.send(panel);
};*/

//exports.read

//exports.update
/*
exports.delete = function (req, res) {
    return Todo.findById(req.params.id, function(err, todo) {
    return todo.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });
};
*/