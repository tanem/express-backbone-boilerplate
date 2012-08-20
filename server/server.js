var express = require('express'),
    app = express(),
    path = require('path'),
    src = require('./routes/src'),
    test = require('./routes/test');

app.get('/src/css/*', src.css);
app.get('/src/font/*', src.font);
app.get('/src/js/*', src.js);
app.get('/', src.index);

app.get('/test/*.js', test.js);
app.get('/test/lib/*', test.lib);
app.get('/test', test.index);

app.listen(3000);
console.log('Carousel app listening on port 3000');