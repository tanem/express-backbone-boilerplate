var path = require('path'),
    docsPath = path.join(__dirname, '/../../docs');

module.exports = function (app) {

    app.get('/docs*', function (req, res) {
        
        var param = req.params[0];
        
        if (param !== '') {
            res.sendfile(path.join(docsPath, param));
        } else {
            res.sendfile(path.join(docsPath, 'index.html'));
        }

    });

};