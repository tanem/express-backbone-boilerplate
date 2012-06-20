var casper = require('casper').create();

casper.start('file:///Users/p644205/Sites/_GITHUB_/cube/test/index.html');

casper.waitForSelector('.finished-at', function () {
    this.test.assertExists('.runner.passed', this.fetchText('.runner .description'));
});

casper.run();