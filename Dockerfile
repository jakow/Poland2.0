FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

RUN apk add git make bash g++ zlib-dev libpng-dev

RUN yarn
RUN yarn build

EXPOSE 9009
CMD ["yarn", "staging"]