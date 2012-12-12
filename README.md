# Node Backbone Carousel

A small project I used to figure out how to wire up a simple Node/ExpressJS based JS dev environment.

The app can be started via `./start.sh`.

## Dependencies

 * [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/)
 * [Docco](http://jashkenas.github.com/docco/)
 * [CasperJS](http://casperjs.org/)
 * [Compass](http://compass-style.org/)
 * [jasmine-node](https://github.com/mhevery/jasmine-node)

Note that on Windows, as per [this issue](https://github.com/jashkenas/docco/issues/131), you'll need to install docco as follows: `npm install -g https://github.com/jashkenas/docco/archive/master.tar.gz`

## Client

 * Can be accessed via `http://localhost:3000/client/`

[RequireJS](http://requirejs.org/) is used for file and module loading. [Backbone.js](http://backbonejs.org/) is the client-side MVC framework. [Handlebars](http://handlebarsjs.com/) is used for client-side templating. [Compass](http://compass-style.org/) is used for CSS authoring, and is started as part of the start script.

## Unit tests

Both client and server unit tests can be run via `./run-tests.sh`. JUnit XML is output to `./_junitxml', and be used in CI tools like Jenkins.

### Client

 * Can be run in the browser via `http://localhost:3000/client/test/`
 * Can also be run headless via `./client/bin/run-tests.sh`

[Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS. [CasperJS](http://casperjs.org/) is used to drive the tests headless via [PhantomJS](http://phantomjs.org/). JUnit XML is output to `./_junitxml/client`.

### Server

 * Can be run via `./server/bin/run-tests.sh`

[jasmine-node](https://github.com/mhevery/jasmine-node) is used for testing the Node server JS. JUnit XML is output to `./_junitxml/server`.

## Docs

 * Can be generated via `./client/bin/generate-docs.sh`
 * Can be accessed via `http://localhost:3000/client/docs`

[Docco](http://jashkenas.github.com/docco/) is used to generate the client-side docs. A basic index.html file is also generated via Node as part of the script.
