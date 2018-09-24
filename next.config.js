const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withOptimizedImages = require('next-optimized-images');

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
    publicRuntimeConfig: {
      host: process.env.NODE_ENV === 'production' ? 'https://poland20.com' : 'http://localhost:9009',
    }
  }
)));