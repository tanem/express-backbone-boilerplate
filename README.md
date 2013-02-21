# Node Backbone Carousel

A small project I used to figure out how to wire up a simple Node/ExpressJS based JS dev environment.

 grunt.registerTask('docs', ['clean:docs', 'docco', 'docco_index']);
  grunt.registerTask('test-client', ['clean:junitxml:client', 'server', 'casperjs']);
  grunt.registerTask('test-server', ['clean:junitxml:server', 'prep_junitxmldir', 'jasmine_node']);
  grunt.registerTask('start', ['server', 'watch']);


## Dependencies

 * [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/)
 
Run `npm install` once you've got a copy of the project. The app can be started via `grunt start`.

## Client

 * Can be accessed via `http://localhost:3000/client/`

[RequireJS](http://requirejs.org/) is used for file and module loading. [Backbone.js](http://backbonejs.org/) is the client-side MVC framework. [Handlebars](http://handlebarsjs.com/) is used for client-side templating. [Compass](http://compass-style.org/) is used for CSS authoring, and is started as part of the start script.

## Unit tests

### Client

 * Can be run in the browser via `http://localhost:3000/client/test/`
 * Can also be run headless via `grunt test-client`
 * JUnit XML is output to `./_junitxml/client`

[Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS. [CasperJS](http://casperjs.org/) is used to drive the tests headless via [PhantomJS](http://phantomjs.org/).

### Server

 * Can be run via `grunt test-client`
 * JUnit XML is output to `./_junitxml/server`

[jasmine-node](https://github.com/mhevery/jasmine-node) is used for testing the Node server JS.

## Docs

 * Can be generated via `grunt docs`
 * Output to `./docs`
 * Can be accessed via `http://localhost:3000/docs/[folder]`

[Docco](http://jashkenas.github.com/docco/) is used to generate the client-side docs. A basic index.html file is also generated as part of the script, and included in each subfolder.
