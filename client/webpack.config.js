const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node', node: {__filename: false, __dirname: false},
  externals: nodeExternals(),
  entry: './src/index.ts',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  devtool: 'source-map',
  module: {
  rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      // {
      //   test: /\.(hbs|html|png|svg|woff|ttf|jpe?g)$/,
      //   use: [
      //     {
      //     loader:'file-loader',
      //     options: { name: '[path][name].[ext]', context: 'src'},
      //     // query: {}
      //     }
      //   ]
      // },
      {
        test: /\.s?css$/,
        use: [

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
