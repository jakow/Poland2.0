const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  target: 'node', node: {__filename: false, __dirname: false},
  externals: [nodeExternals()],
  entry: './index.ts',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'index.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  module: {
  rules: [
      {
        test: /\.(t|j)sx?$/,
        use: ['ts-loader']
      }
  ],
},
};



module.exports = config;
