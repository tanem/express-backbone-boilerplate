var casper = require('casper').create(),
    fs = require('fs'),
    junitXmlDir = './_junitxml/client';

casper.start('http://localhost:3000/client/test/');

casper.waitFor(
    function check() {
        return this.evaluate(function () {
            return typeof jasmine.JUnitXmlReporter.finished_at === 'number';
        });
    },
    function then() {

        var junitXmlResults = this.evaluate(function () {
            return window.junitXmlResults;
        });

        fs.removeTree(junitXmlDir);
        fs.makeTree(junitXmlDir);
        fs.changeWorkingDirectory(junitXmlDir);

        Object.keys(junitXmlResults).forEach(function (key) {
            fs.write(key, junitXmlResults[key], 'w');
        });

        this.waitForSelector('.alert .bar', function () {
            this.test.assertExists('.alert .passingAlert', this.fetchText('.alert .bar:nth-child(1)'));
        });

    }
);

casper.run();