require.config({
    
    baseUrl: 'js',

    enforceDefine: true,

    paths: {

        // Core libraries.
        jquery: 'lib/jquery-1.7.2',
        underscore: 'lib/underscore-1.3.3',
        backbone: 'lib/backbone-0.9.2',
        handlebars: 'lib/handlebars-1.0.0.beta.6',

        // RequireJS plugins.
        text: 'lib/text-2.0.0'

    },

    // Sets the configuration for scripts that are not AMD compatible.
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
        }

    }

});

define(['views/app'], function (AppView) {
    var appView = new AppView({
        el: 'body'
    });
});