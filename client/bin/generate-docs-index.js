var fs = require('fs'),
    path = require('path'),
    docsPath = path.join(__dirname, '../../docs'),
    fileList = '';

// Read the generated docco html files and create a list from them.
fs.readdirSync(docsPath).forEach(function (fileName) {
    
    var displayName, href;

    if (/\.css$/.test(fileName)) {
        return;
    }
    
    displayName = fileName.replace(/\.html$/, '');
    href = '/docs/' + fileName;

    fileList += '<li><a href="' + href + '">' + displayName + '</a></li>';

});

// TODO: Run this through a template?
var html = '' +
  '<!doctype html>' +
    '<html>' +
      '<head>' +
        '<meta charset="utf-8">' +
        '<title>Docs | Node Carousel</title>' +
      '</head>' +
      '<body>' +
        '<h1>Docs | Node Carousel</h1>' +
        '<ul>' + fileList + '</ul>' +
      '</body>' +
    '</html>';

// Write out the index html page.
fs.writeFileSync(
    path.join(docsPath, 'index.html'),
    html,
    'utf8',
    function (err) {
        if (err) {
            throw err;
        }
    }
);