require.config({
  baseUrl: '/client/src/js',
  paths: {
    jasmine: '/bower_components/jasmine/lib/jasmine-core/jasmine',
    jasmineHtml: '/bower_components/jasmine/lib/jasmine-core/jasmine-html'
  },
  shim: {
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmineHtml': {
      deps: ['jasmine'],
      exports: 'jasmine.HtmlReporter'
    }
  }
});