const dotEnv = require('dotenv').config();
if (dotEnv.error) {
  throw dotEnv.error;
}

const withOptimizedImages = require('next-optimized-images');

const localhost = 'http://localhost:1337';

module.exports =
  // withCSS(
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
    env: {
      stripeApiKey: process.env.NODE_ENV !== 'production' ? process.env.STRIPE_PK_TEST : process.env.STRIPE_PK_LIVE,
    },
    serverRuntimeConfig: {
      host: process.env.NODE_ENV !== 'development' ? 'http://api:1337' : localhost
    },
    publicRuntimeConfig: {
      host: process.env.NODE_ENV !== 'development' ? process.env.API_URL : localhost
    }
  }
);//);
