#!/bin/sh

# get environment variables
source /etc/profile.d/poland20.sh
yarn install --production=true
yarn start