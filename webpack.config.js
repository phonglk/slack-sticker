/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = typeof process.env.PRODUCTION !== 'undefined';
console.log((isProduction ? 'Production' : 'Test') + ' build ...');
const distPath = isProduction ? './dist/packed/' : './dist/unpacked/';
module.exports = {
  devtool: isProduction ? 'nosources-source-map' : 'cheap-module-source-map',
  entry: {
    'content': './src/content/content.js',
    'background': './src/background/background.js',
    'options': './src/options/options.js',
  },
  output: {
    path: path.join(__dirname, distPath),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ],
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'PRODUCTION': 1
      }
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(distPath + 'common-manifest.json')
    }),
    /* Add more webpack.DllReferencePlugin if needed */
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './manifest.json'),
        to: 'manifest.json'
      },
      {
        from: path.join(__dirname, './assert'),
        to: './assert'
      },
      {
        from: path.join(__dirname, './src/options/options.html'),
        to: './options.html'
      },
      {
        from: path.join(__dirname, './src/background/background.html'),
        to: './background.html'
      },
      {
        from: path.join(__dirname, './src/popup/popup.html'),
        to: './popup.html'
      },
      /* Add more copy command if needed */
    ]),
  ].concat(isProduction ? [
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
    }),
  ]: [])
};
