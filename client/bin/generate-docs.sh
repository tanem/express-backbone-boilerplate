#!/bin/sh

BASEDIR=$(dirname $0)

src=$BASEDIR/../src/js
docco $src/core/*.js $src/views/*.js $src/main.js
touch $BASEDIR/../../docs/index.html