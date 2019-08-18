FROM node:10-alpine as builder

RUN apk --no-cache add git make bash g++ zlib-dev libpng-dev

COPY package.json yarn.lock ./
RUN yarn --prod

FROM node:10-alpine

ARG NODE_ENV

WORKDIR /app
COPY --from=builder node_modules node_modules
COPY . .

RUN NODE_ENV=${NODE_ENV} yarn build
