const webpack = require('webpack');
const path = require('path');
/* eslint-disable max-len */

const isProduction = typeof process.env.PRODUCTION !== 'undefined';
console.log((isProduction ? 'Production' : 'Test') + ' build ...');
const distPath = isProduction ? './dist/packed/' : './dist/unpacked/';

module.exports = {
  entry: {
    common: [
      'core-decorators',
      'lodash',
      'react',
    ],
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve(distPath),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
    }),
    new webpack.DllPlugin({
      path: path.resolve(distPath + '[name]-manifest.json'),
      name: '[name]_lib',
    }),
  ],
};
