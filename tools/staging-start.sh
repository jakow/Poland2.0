#!/bin/sh

yarn install --production=true
STAGING=1 node_modules/.bin/pm2 start build/index.js --name staging