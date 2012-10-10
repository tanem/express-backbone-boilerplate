module.exports = function (app) {

    app.get('/docs*', function (req, res) {
        
        var param = req.params[0];
        
        if (param !== '') {
            res.sendfile(path.join(__dirname, '/../docs', param));
        } else {
            res.sendfile(path.join(__dirname, '/../docs', 'index.html'));
        }
        
    });

};