#!/bin/bash

node server/bin/stop-server.js
node server/server.js &
compass watch