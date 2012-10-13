#!/bin/sh

BASEDIR=$(dirname $0)
junitxmldir=$BASEDIR/../../_junitxml/server/

mkdir -p $junitxmldir
jasmine-node $BASEDIR/../test --junitreport --output $junitxmldir