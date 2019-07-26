FROM node:10-alpine

RUN apk add --no-cache git make bash g++ zlib-dev libpng-dev

WORKDIR /app
COPY . .

RUN yarn
