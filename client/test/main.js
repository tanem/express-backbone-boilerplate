require.config({
        
    baseUrl: '/src/js',

    enforceDefine: true,
    
    paths: {

        jquery: 'lib/jquery-1.8.0',
        underscore: 'lib/underscore-1.3.3',
        backbone: 'lib/backbone-0.9.2',
        handlebars: 'lib/handlebars-1.0.0.beta.6',

        text: 'lib/text-2.0.3',

        jasmine: '../../../client/test/lib/jasmine-1.2.0/jasmine',
        jasmineHtml: '../../client/test/lib/jasmine-1.2.0/jasmine-html',
        jasmineJunitXml: '../../client/test/lib/jasmine-reporters/jasmine.junit_reporter',
        
        tests: '../../client/test/tests'

    },

    shim: {

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        'handlebars': {
            exports: 'Handlebars'
        },

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
    
define([
    'backbone',
    'jquery',
    'jasmine',
    'jasmineHtml',
    'jasmineJunitXml',
    'tests'
], function (
    Backbone,
    $,
    jasmine
) {

    var jasmineEnv = jasmine.getEnv(),
        htmlReporter = new jasmine.HtmlReporter(),
        junitXmlReporter = new jasmine.JUnitXmlReporter();
    
    jasmineEnv.updateInterval = 250;
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.addReporter(junitXmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };
    
    $(function () {
        $('.version').html(jasmineEnv.versionString());
        jasmineEnv.execute();
    });
  
});