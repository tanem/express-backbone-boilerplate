#!/bin/sh

BASEDIR=$(dirname $0)

node $BASEDIR/../../server/bin/stop-server.js
node $BASEDIR/../../server/server.js &
casperjs $BASEDIR/../test/lib/casperjs-runner.js