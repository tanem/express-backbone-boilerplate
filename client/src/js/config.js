require.config({
    
  baseUrl: '/client/src/js',

  deps: ['/client/src/js/lib/require.config.js'],

  paths: {

    // Collections
    panelsCollection: 'collections/panels',

    // Core
    eventMediator: 'core/eventMediator',
    util: 'core/util',

    // Lib
    // backbone: 'lib/backbone',
    // domReady: 'lib/domReady',
    // handlebars: 'lib/handlebars',
    // jquery: 'lib/jquery',
    // text: 'lib/text',
    // underscore: 'lib/underscore', 

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