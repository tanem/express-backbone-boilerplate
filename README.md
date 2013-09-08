# Express Backbone Boilerplate

[![Build Status](https://travis-ci.org/tanem/express-backbone-boilerplate.png)](https://travis-ci.org/tanem/express-backbone-boilerplate)

A small sample app built using Express and Backbone plus a few friends. I've used it as the basis for a few bigger projects, so hope it can help others in this regard too. 

## Dependencies

Ensure the following are installed:

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 * [PhantomJS](http://phantomjs.org/)
 * [Pygments](http://pygments.org/download/)
 * [Compass](http://compass-style.org/)
 
Install the global dependencies:

    $ npm install -g grunt-cli karma istanbul node-inspector bower

Change to your project directory then install the local dependencies:

    $ npm install
    $ bower install

## Client

 * [RequireJS](http://requirejs.org/) is used for file and module loading
 * [Backbone.js](http://backbonejs.org/) is the client-side MVC framework
 * [Handlebars](http://handlebarsjs.com/) is used for client-side templating
 * [Compass](http://compass-style.org/) is used for CSS authoring

To start using default options:

    $ grunt start

Can be accessed via `http://127.0.0.1:3000/`. [Node Inspector](https://github.com/dannycoates/node-inspector) will also be available via `http://0.0.0.0:8080/debug?port=5858`.

Once started, the app will also:

 * Watch the server source files, and restart the Node server if any changes are made
 * Watch the SASS files, and recompile the dev CSS if any changes are made
 * Watch the relevant JS files, and run the relevant JSHint tasks if any changes are made

## Unit tests

### Client

 * [Jasmine](http://pivotal.github.com/jasmine/) is used for testing the JS
 * The Jasmine SpecRunner.html is automatically generated via grunt
 * [Karma](https://github.com/karma-runner/karma) is used to run the tests against various browsers, as well as providing code coverage via [Istanbul](https://github.com/gotwarlost/istanbul)

Tests can be run in the browser via `http://127.0.0.1:3000/test`.

To run tests only:

    $ grunt client:test

To run tests with coverage:

    $ grunt client:cover

Coverage information is output to `./coverage/client`.

### Server

 * [Mocha](http://visionmedia.github.io/mocha/) and [expect.js](https://github.com/LearnBoost/expect.js) are used for testing the Node server JS
 * [Istanbul](https://github.com/gotwarlost/istanbul) is used to run the tests and provide code coverage

To run tests only:

    $ grunt server:test

To run tests with coverage:

    $ grunt server:coverage

Coverage information is output to `./coverage/server`.

## Docs

 * [Docker](https://github.com/Prevole/grunt-docker) is used to generate the documentation.
 
To generate:

    $ grunt docs

Can be accessed via `http://localhost:3000/docs`.

## Distribution

 * Uses the RequireJS optimiser to compress the JS
 * Rewrites the index.html file to only include the one script

To generate:

    $ grunt dist

## Credits

 * [@andrewpmckenzie](https://github.com/andrewpmckenzie), whose [node-jasmine-dom](https://github.com/andrewpmckenzie/node-jasmine-dom) was a big inspiration for this project
 * [@smozely](https://github.com/smozely), for the scaffolding and eventMediator suggestions
 * [@timsnadden](https://github.com/timsnadden), for showing me some new npm modules and Backbone helpers
 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul and Karma
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for configuring my own
 * [@balderdashy](https://github.com/balderdashy), whose MVC configuration in [Sails.js](https://github.com/balderdashy/sails) inspired mine
