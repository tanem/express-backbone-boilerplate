var express = require('express'),
    app = express(),
    path = require('path');

require('./routes/src')(app);
require('./routes/test')(app);
require('./routes/api')(app);

app.get('/shutdown', function (req, res) {
    res.send('');
    process.exit(0);
});

app.get('/docs*', function (req, res) {
    var param = req.params[0];
    if (param !== '') {
        res.sendfile(path.join(__dirname, '/../docs', param));
    } else {
        res.sendfile(path.join(__dirname, '/../docs', 'index.html'));
    }
});

app.listen(3000);
console.log('Carousel app listening on port 3000');