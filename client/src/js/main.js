require.config({
    
  baseUrl: '/src/js',

  enforceDefine: true,

  paths: {

    // Collections
    panelsCollection: 'collections/panels',

    // Core
    eventMediator: 'core/eventMediator',
    util: 'core/util',

    // Lib
    backbone: 'lib/backbone-0.9.2',
    handlebars: 'lib/handlebars-1.0.0.beta.6',
    jquery: 'lib/jquery-1.8.0',
    text: 'lib/text-2.0.3',
    underscore: 'lib/underscore-1.3.3',

    // Models
    panelModel: 'models/panel',

    // Views
    appView: 'views/app',
    carouselView: 'views/carousel',
    panelView: 'views/panel'

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

define('main', function(require){

    var Backbone = require('backbone'),
      AppView = require('appView');

    var appView = new AppView({
        el: 'body'
    });

});