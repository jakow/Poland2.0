FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

RUN apk add --no-cache git make bash g++ zlib-dev libpng-dev

RUN npm install