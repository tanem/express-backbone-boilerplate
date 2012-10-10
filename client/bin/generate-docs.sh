#!/bin/sh

BASEDIR=$(dirname $0)
src=$BASEDIR/../src/js

rm -r $BASEDIR/../../docs
mkdir -p $BASEDIR/../../docs
docco $src/core/*.js $src/views/*.js $src/main.js
node $BASEDIR/generate-docs-index.js