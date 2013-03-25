# Express Backbone Boilerplate

[![Build Status](https://travis-ci.org/tanem/express-backbone-boilerplate.png)](https://travis-ci.org/tanem/express-backbone-boilerplate)

Okay okay, not quite a bare-bones boilerplate, more of a small sample app built using Express and Backbone plus a few friends. I've called it a boilerplate because I've used it as the basis for a few bigger projects, so hope it can help others in this regard too. 

## Dependencies

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 * [PhantomJS](http://phantomjs.org/)
 * [CasperJS](http://casperjs.org/installation.html)
 * [Pygments](http://pygments.org/download/)
 * [Grunt-CLI](http://gruntjs.com/getting-started#installing-the-cli)
 * [Compass](http://compass-style.org/)
 
Run `npm install` once you've got a copy of the project.

## Client

 * Can be started via `grunt start`
 * Can be accessed via `http://localhost:3000/client/`

You can also pass the following commandline args to `grunt start`:

 * `--NODE_ENV`: `production` or `development` (defaults to `development`)
 * `--NODE_PORT`: (defaults to `3000`)

e.g. `grunt start --NODE_ENV=production --NODE_PORT=4000` will start the server in production mode on port 4000.

The `grunt start` task will also:

 * Watch the SASS files, and recompile the dev CSS if any changes are made
 * Watch the client src & test JS files, and run JSHint plus the client tests if any changes are made
 * Watch the server src & test JS files, and run JSHint plus the server tests if any changes are made

[RequireJS](http://requirejs.org/) is used for file and module loading. [Backbone.js](http://backbonejs.org/) is the client-side MVC framework. [Handlebars](http://handlebarsjs.com/) is used for client-side templating. [Compass](http://compass-style.org/) is used for CSS authoring.

## Unit tests

### Client

 * Can be run in the browser via `http://localhost:3000/client/test/`
 * Can also be run headless via `grunt test-client`
 * JUnit XML is output to `./_junitxml/client`

A module listing the required tests to run is generated via grunt. [Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS. [CasperJS](http://casperjs.org/) is used to drive the tests headless via [PhantomJS](http://phantomjs.org/).

### Server

 * Can be run via `grunt test-server`
 * JUnit XML is output to `./_junitxml/server`

[jasmine-node](https://github.com/mhevery/jasmine-node) is used for testing the Node server JS.

## Docs

 * Can be generated via `grunt docs`
 * Output to `./_docs`
 * Can be accessed via `http://localhost:3000/_docs`

[Docker](https://github.com/Prevole/grunt-docker) is used to generate the client-side docs.

## Distribution

 * Can be generated via `grunt dist`

Uses the RequireJS optimiser to compress the JS. Rewrites the index.html file to only include the one script.

## Thanks

 * [@andrewpmckenzie](https://github.com/andrewpmckenzie), whose [node-jasmine-dom](https://github.com/andrewpmckenzie/node-jasmine-dom) was a big inspiration for this project
 * [@smozely](https://github.com/smozely), for the scaffolding and eventMediator suggestions
 * [@timsnadden](https://github.com/timsnadden), for showing me some new npm modules and Backbone helpers
