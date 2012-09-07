require.config({
    
    baseUrl: '/src/js',

    enforceDefine: true,

    paths: {

        // Core libraries.
        jquery: 'lib/jquery-1.8.0',
        underscore: 'lib/underscore-1.3.3',
        backbone: 'lib/backbone-0.9.2',
        handlebars: 'lib/handlebars-1.0.0.beta.6',

        // RequireJS plugins.
        text: 'lib/text-2.0.3'

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

define(['backbone', 'views/app'], function (Backbone, AppView) {

    // No synching for now.
    // TODO: Set up node endpoints.
    Backbone.sync = function () {};

    var appView = new AppView({
        el: 'body'
    });

});