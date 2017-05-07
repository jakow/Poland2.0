const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

const cssLoaders = [
  'css-loader',
  {loader: 'postcss-loader', options: {
    plugins: () => [require('autoprefixer')]
  }}, 
  'sass-loader',
];

const config = {
  target: 'web',
  entry: './client/main.ts',
  output: {
    path: path.resolve(__dirname, '..', 'build', 'client'),
    filename: 'index.js',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: isProduction? 'source-map' : 'eval-source-map',
  devServer: {
    compress: true,
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
      use: isProduction ? ExtractTextPlugin.extract({fallback:'style-loader', use: cssLoaders}) : 
        ['style-loader', ...cssLoaders],
    }
    ],
    
  },
  plugins: [
    // core plugins which are always used
    // currently empty
    // and production only plugins
    ... isProduction ? [
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
      new ExtractTextPlugin("main.css"),
      new UglifyJsPlugin({sourceMap: true}),
      // full disclosure - some cool hack for getting rid of locales when minifiying moment.js
      new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|pl/)
    ] : []
  ]
};

console.info(`Serving config dev server on localhost:${config.devServer.port}`);

module.exports = config;
