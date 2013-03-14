var casper = require('casper').create(),
  fs = require('fs'),
  junitXmlDir = casper.cli.get(0);

casper.start('http://localhost:3000/client/test/');

casper.waitFor(
  function check() {
    return this.evaluate(function(){
      return typeof jasmine.JUnitXmlReporter.finished_at === 'number';
    });
  },
  function then() {

    var junitXmlResults = this.evaluate(function(){
      return window.junitXmlResults;
    });

    fs.removeTree(junitXmlDir);
    fs.makeTree(junitXmlDir);
    fs.changeWorkingDirectory(junitXmlDir);

    Object.keys(junitXmlResults).forEach(function(key){
      fs.write(key, junitXmlResults[key], 'w');
    });

    if (this.exists('.passingAlert')) {
      casper.echo(this.fetchText('.passingAlert.bar'), 'INFO');
      casper.exit(0);
    } else {
      casper.echo(this.fetchText('.failingAlert.bar'), 'ERROR');
      // casper.echo(this.fetchText('#details .failed .description'));
      casper.exit(3);
    }

  }
);

casper.run();