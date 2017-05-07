const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';
const sassPaths = [
  './node_modules/sassline/sass'
].map( (p) => path.resolve(p));

const config = {
  target: 'web',
  entry: './client/main.ts',
  output: {
    path: path.resolve(__dirname, '..', 'build', 'client'),
    filename: 'index.js',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: isProduction? 'cheap-module-source-map' : 'source-map',
  devServer: {
    compress: false,
    port: 8000,
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      }
    }
  },
  module: {
  rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFileName: '../tsconfig.json'
          }
        }
          ],
      
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader', 
          {loader:'css-loader', options: {importLoaders: 1}},
          {loader: 'postcss-loader', options: {
            plugins: [require('autoprefixer')]
          }}, 
          'sass-loader']
      }
  ],

},
};



module.exports = config;
