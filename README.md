# Express Backbone Boilerplate

[![Build Status](https://travis-ci.org/tanem/express-backbone-boilerplate.png)](https://travis-ci.org/tanem/express-backbone-boilerplate)

Okay okay, not quite a bare-bones boilerplate, more of a small sample app built using Express and Backbone plus a few friends. I've called it a boilerplate because I've used it as the basis for a few bigger projects, so hope it can help others in this regard too. 

## Dependencies

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 * [PhantomJS](http://phantomjs.org/)
 * [CasperJS](http://casperjs.org/installation.html)
 * [Pygments](http://pygments.org/download/)
 
To install:

    $ npm install

## Client

 * [RequireJS](http://requirejs.org/) is used for file and module loading
 * [Backbone.js](http://backbonejs.org/) is the client-side MVC framework
 * [Handlebars](http://handlebarsjs.com/) is used for client-side templating
 * [Compass](http://compass-style.org/) is used for CSS authoring

To start:

    $ grunt start

Can be accessed via `http://localhost:3000/client/`.

You can also pass the following commandline args to `grunt start`:

 * `--NODE_ENV`: `production` or `development` (defaults to `development`)
 * `--NODE_PORT`: (defaults to `3000`)

e.g. to start the server in production mode on port 4000:

    $ grunt start --NODE_ENV=production --NODE_PORT=4000

The `grunt start` task will also:

 * Watch the SASS files, and recompile the dev CSS if any changes are made
 * Watch the client src & test JS files, and run JSHint plus the client tests if any changes are made
 * Watch the server src & test JS files, and run JSHint plus the server tests if any changes are made

## Unit tests

### Client

 * A module listing the required tests to run is generated via grunt
 * [Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS
 * [CasperJS](http://casperjs.org/) is used to drive the tests headless via [PhantomJS](http://phantomjs.org/)
 * JUnit XML is output to `./_junitxml/client`

Tests can be run in the browser via `http://localhost:3000/client/test/`.

To run headless:

    $ grunt test-client

### Server

 * [jasmine-node](https://github.com/mhevery/jasmine-node) is used for testing the Node server JS
 * JUnit XML is output to `./_junitxml/server`

To run:

    $ grunt test-server

## Docs

 * [Docker](https://github.com/Prevole/grunt-docker) is used to generate the client-side docs
 * Output to `./_docs`
 
To generate:

    $ grunt docs

Can be accessed via `http://localhost:3000/_docs`.

## Distribution

 * Uses the RequireJS optimiser to compress the JS
 * Rewrites the index.html file to only include the one script

To generate:

    $ grunt dist

## Thanks

 * [@andrewpmckenzie](https://github.com/andrewpmckenzie), whose [node-jasmine-dom](https://github.com/andrewpmckenzie/node-jasmine-dom) was a big inspiration for this project
 * [@smozely](https://github.com/smozely), for the scaffolding and eventMediator suggestions
 * [@timsnadden](https://github.com/timsnadden), for showing me some new npm modules and Backbone helpers
