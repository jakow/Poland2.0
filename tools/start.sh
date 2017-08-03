#!/bin/sh

# get environment variables
# source /etc/profile.d/poland20.sh
# use dotenv from server
cp /var/www/.env ./.env
yarn install --production=true
yarn start