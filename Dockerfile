FROM mhart/alpine-node:10 AS base

WORKDIR /app
COPY . .

RUN apk add git make bash g++ zlib-dev libpng-dev

RUN yarn

EXPOSE 9009