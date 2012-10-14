// Hat tip to andrewpmckenzie for the initial concept!
var http = require('http'),
    options = {
        host: 'localhost',
        port: 3000,
        path: '/shutdown'
    },
    request;

console.log('Making stop request via http://' + options.host + ':' + options.port + options.path);

request = http.request(options, function (res) {
    console.log('Server stop successful');
});

request.on('error', function (e) {
    console.log('Could not shut down server - are you sure it\'s not shutdown already?');
});

request.end();