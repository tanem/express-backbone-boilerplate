# Node Carousel

A small project I used to figure out how to wire up a simple Node/ExpressJS based dev environment.

The app can be started via `./start.sh`.

## Dependencies

 * [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/)
 * [Docco](http://jashkenas.github.com/docco/)
 * [CasperJS](http://casperjs.org/)
 * [Compass](http://compass-style.org/)
 * [CasperJS](http://casperjs.org/)
 * [jasmine-node](https://github.com/mhevery/jasmine-node)

## Client

 * Can be accessed via `http://localhost:3000/`

[RequireJS](http://requirejs.org/) is used for file and module loading. [Backbone.js](http://backbonejs.org/) is the client-side MVC framework. [Handlebars](http://handlebarsjs.com/) is used for client-side templating. [Compass](http://compass-style.org/) is used for CSS authoring, and is started as part of the start script.

## Unit tests

### Client

 * Can be run in the browser via `http://localhost:3000/test`
 * Can also be run headless via `./client/bin/run-tests.sh`

[Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS. [CasperJS](http://casperjs.org/) is used to drive the tests headless via [PhantomJS](http://phantomjs.org/).

### Server

 * Can be run via `./server/bin/run-tests.sh`

[jasmine-node](https://github.com/mhevery/jasmine-node) is used for testing the Node server JS.

## Docs

 * Can be generated via `./client/bin/generate-docs.sh`
 * Can be accessed via `http://localhost:3000/docs`

[Docco](http://jashkenas.github.com/docco/) is used to generate the client-side docs. A basic index.html file is also generated via Node as part of the script.

