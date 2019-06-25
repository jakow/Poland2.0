const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withOptimizedImages = require('next-optimized-images');

const localhost = 'http://localhost:1337';

module.exports =
  withTypescript(
  withCSS(
  withOptimizedImages({
    webpack: config => {
      config.node = {
        fs: 'empty'
      };

      const original = config.entry;
      config.entry = async () => {
        const entries = await original();
        if (entries['main.js'] && !entries['main.js'].includes('./polyfill.js')) {
          entries['main.js'].unshift('./polyfill.js')
        }

        return entries;
      }

      return config;
    },
    serverRuntimeConfig: {
      host: process.env.NODE_ENV ? 'http://api:1337' : localhost
    },
    publicRuntimeConfig: {
      host: process.env.NODE_ENV ? process.env.API_URL : localhost
    }
  }
)));