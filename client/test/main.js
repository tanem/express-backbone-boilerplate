require([
  'jquery',
  'jasmine',
  'jasmineHtml'
], function(
  $,
  jasmine
){

  'use strict';

  require(['tests'], function(){

    var jasmineEnv = jasmine.getEnv(),
      htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.updateInterval = 250;
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec){
      return htmlReporter.specFilter(spec);
    };

    $(function(){
      $('.version').html(jasmineEnv.versionString());
      jasmineEnv.execute();
    });

  });

});