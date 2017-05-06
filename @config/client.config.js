const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const sassPaths = [
  './node_modules/sassline/sass'
].map( (p) => path.resolve(p));

const config = {
  target: 'web',
  entry: './client/main.ts',
  output: {
    path: path.resolve(__dirname, '..', 'build', 'client'),
    filename: 'index.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: 'source-map',
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
  ],

},
};



module.exports = config;
