require.config({
  
  baseUrl: '/client/src/js',      
  
  deps: ['/client/src/js/config.js'],
    
  paths: {

    jasmine: '/client/test/lib/jasmine-1.2.0/jasmine',
    jasmineHtml: '/client/test/lib/jasmine-1.2.0/jasmine-html',
    jasmineJunitXml: '/client/test/lib/jasmine-reporters/jasmine.junit_reporter',
    
    tests: '/client/test/tests'

  },

  shim: {

    'jasmine': {
      exports: 'jasmine'
    },

    'jasmineHtml': {
      deps: ['jasmine'],
      exports: 'jasmine.HtmlReporter'
    },

    'jasmineJunitXml': {
      deps: ['jasmine'],
      exports: 'jasmine.JUnitXmlReporter'
    }

  }

});