var path = require('path'),
    clientTestPath = path.join(__dirname, '/../../client/test');

exports.js = function (req, res) {
    res.sendfile(path.join(clientTestPath, req.params[0] + '.js'));
};

exports.lib = function (req, res) {
    res.sendfile(path.join(clientTestPath, 'lib', req.params[0]));
};

exports.index = function (req, res) {
    res.sendfile(path.join(clientTestPath, 'index.html'));
};