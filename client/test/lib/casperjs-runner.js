var casper = require('casper').create();

casper.start('http://localhost:3000/test/');

casper.waitForSelector('.alert .bar', function () {
    this.test.assertExists('.alert .passingAlert', this.fetchText('.alert .bar:nth-child(1)'));
});

casper.run();