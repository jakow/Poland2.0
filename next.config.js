import * as withTypescript from '@zeit/next-typescript';
import * as withCSS from '@zeit/next-css';

export default withTypescript(withCSS({
  webpack: config => {
    config.node = {
      fs: 'empty'
    };

    return config;
  }
}));