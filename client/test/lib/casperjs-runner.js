var casper = require('casper').create(),
  fs = require('fs'),
  junitXmlDir = casper.cli.get(0);

var writeXML = function(){

  var junitXmlResults = casper.evaluate(function(){
    return window.junitXmlResults;
  });

  fs.removeTree(junitXmlDir);
  fs.makeTree(junitXmlDir);
  fs.changeWorkingDirectory(junitXmlDir);

  Object.keys(junitXmlResults).forEach(function(key){
    fs.write(key, junitXmlResults[key], 'w');
  });

};

var logResultsAndExit = function(){
  
  if (casper.exists('.passingAlert')) {
    casper.echo(casper.fetchText('.passingAlert.bar'), 'INFO');
    casper.exit(0);
  } else {
    casper.echo(casper.fetchText('.failingAlert.bar'), 'ERROR');

    // The intention here is to show something that's useful enough for us
    // not to have to re-run the tests in the browser.
    casper.evaluate(function(){

      var titles = __utils__.findAll('#details .description'),
        messages = __utils__.findAll('#details .resultMessage'),
        count;
      
      Array.prototype.forEach.call(titles, function(element, index){
        count = index + 1;
        __utils__.echo(count + ') ' + titles[index].innerText);
        __utils__.echo('  ' + messages[index].innerText);
      });

    });

    casper.exit(3);
  }
};

casper.start('http://localhost:3000/client/test/');

casper.waitFor(
  function check() {
    return this.evaluate(function(){
      return typeof jasmine.JUnitXmlReporter.finished_at === 'number';
    });
  },
  function then() {
    writeXML();
    logResultsAndExit();
  }
);

casper.run();