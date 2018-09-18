import * as withTypescript from '@zeit/next-typescript';
import * as withCSS from '@zeit/next-css';
import * as withOptimizedImages from 'next-optimized-images';

export default
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
    }
  }
)));