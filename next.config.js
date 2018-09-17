import * as withTypescript from '@zeit/next-typescript';
import * as withCSS from '@zeit/next-css';
import * as withOptimizedImages from 'next-optimized-images';

export default withTypescript(withCSS(withOptimizedImages({
  webpack: config => {
    config.node = {
      fs: 'empty'
    };

    return config;
  }
})));