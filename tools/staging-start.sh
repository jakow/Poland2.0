#!/bin/sh
yarn install --production=true
NODE_ENV=staging node_modules/.bin/pm2 start build/index.js --name staging