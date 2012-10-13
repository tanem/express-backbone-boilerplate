#!/bin/sh

BASEDIR=$(dirname $0)
src=$BASEDIR/../src/js
docs=$BASEDIR/../docs

rm -r $docs
mkdir -p $docs
docco -o $docs $src/core/*.js $src/views/*.js $src/main.js
node $BASEDIR/generate-docs-index.js