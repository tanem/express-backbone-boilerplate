#!/bin/sh

BASEDIR=$(dirname $0)

mkdir -p $BASEDIR/../../build/_junitreport/server &&
node $BASEDIR/stop-server.js &&
$BASEDIR/../node_modules/jasmine-node/bin/jasmine-node $BASEDIR/../test --junitreport --output $BASEDIR/../../build/_junitreport/server/