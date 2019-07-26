FROM node:10-alpine as builder

RUN apk --no-cache add git make bash g++ zlib-dev libpng-dev

COPY package.json yarn.lock ./
RUN yarn

FROM node:10-alpine

WORKDIR /app
COPY --from=builder node_modules node_modules
COPY . .

RUN yarn build