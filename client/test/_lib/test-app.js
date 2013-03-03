define([
  'backbone',
  'jquery',
  'jasmine',
  'jasmineHtml',
  'jasmineJunitXml',
  'tests'
], function(
  Backbone,
  $,
  jasmine,
  jasmineHtml,
  jasmineJunitXml
){

  var jasmineEnv = jasmine.getEnv(),
    htmlReporter = new jasmine.HtmlReporter(),
    junitXmlReporter = new jasmine.JUnitXmlReporter();
  
  jasmineEnv.updateInterval = 250;
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.addReporter(junitXmlReporter);
  jasmineEnv.specFilter = function(spec){
    return htmlReporter.specFilter(spec);
  };
  
  $(function(){
    $('.version').html(jasmineEnv.versionString());
    jasmineEnv.execute();
  });
  
});