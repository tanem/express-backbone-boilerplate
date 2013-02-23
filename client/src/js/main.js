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
    backbone: 'lib/backbone',
    handlebars: 'lib/handlebars',
    jquery: 'lib/jquery',
    text: 'lib/text',
    underscore: 'lib/underscore', 

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