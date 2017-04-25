const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'browser',
  entry: './main.ts',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '..', 'build', 'client'),
    filename: 'index.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: 'source-map',
  module: {
  rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.s?css$/,
        use: [
            ['style-loader', 'css-loader', 'sass-loader']
        ]
      }
  ],

},
// plugins: [
//   new CopyWebpackPlugin([
//     {from: 'src/views', to: 'views'}
//   ])
// ]
};



module.exports = config;
