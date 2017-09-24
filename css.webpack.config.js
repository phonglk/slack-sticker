const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProduction = typeof process.env.PRODUCTION !== 'undefined';
console.log((isProduction ? 'Production' : 'Test') + ' build ...');
const distPath = isProduction ? './dist/packed/' : './dist/unpacked/';

module.exports = {
  entry: {
    'content-style': './src/content/content-style.less',
    'options-style': './src/options/options-style.less',
  },
  output: {
    path: path.join(__dirname, distPath),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css|\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?.*$|$)/,
        use: [
          { loader: 'base64-font-loader' },
        ],
      },
      {
        test: /\.(svg|png|jpg)(\?.*$|$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              name: './assert/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true,
    }),
  ],
};
