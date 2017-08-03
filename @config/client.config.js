const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const nodeExternals = require('webpack-node-externals');
const AssetsPlugin = require('assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const postcssPlugins = (loader) => ([
  require('autoprefixer')(),
  require('postcss-assets')(),
]);

const cssLoaders = [
  // {loader:'style-loader', options: {sourceMap: true}},
  {loader:'css-loader', options: {sourceMap: true}},
  {
    loader:'postcss-loader',  
    options: {
      sourceMap: true, 
      plugins: postcssPlugins,
    },
  },
  {loader:'sass-loader', options: {sourceMap: true}},
];

// root build directory for the SERVER. Client is in /client/
const buildDir = path.resolve(__dirname, '..', 'build');

const config = {
  target: 'web',
  entry: {
    main: './client/main.ts',
    home: './client/views/home/home.ts'
  },
  output: {
    path: path.join(buildDir, 'client'),
    filename: isProduction ? '[name]-[hash:12].js' : '[name].js',
    publicPath: '/static/client/',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    compress: true,
    port: 8000,
    proxy: {
      '/': {
        target: 'http://localhost:4000'
      }
    },
    disableHostCheck: true,
  },
  module: {
    rules: [
    {
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFileName: '@config/tsconfig.client.json',
        }
      }
      ],
    },
    {
      test: /\.s?css$/,
      use: isProduction ? 
        ExtractTextPlugin.extract({fallback: 'style-loader', use: cssLoaders}) : 
        [{loader:'style-loader', options: {sourceMap: true}}, ...cssLoaders],
    }
    ],
    
  },
  plugins: [...isProduction ? [
        new webpack.DefinePlugin({
          'process.env': {'NODE_ENV': JSON.stringify('production')}
        }),
        new ExtractTextPlugin("[name]-[contenthash:12].css"),
        new UglifyJsPlugin({sourceMap: true}),
        new AssetsPlugin({
          path: buildDir,
          filename: 'assets.json',
        }),
      ] : [],
      // some cool hack for getting rid of unused locales when minifiying moment.js
      new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|pl/),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        minChunks: 2,
      }),
    ],
};

module.exports = config;
