/* global webpack */

const
  path = require('path'),
  webpack = require('webpack');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const extractCSS = new ExtractTextPlugin('[name].bundle.css');


const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'rmr-backdrop.bundle.js'
  },
  mode: 'production',
  plugins : [
//     new webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false }
//     })
  ],
  watch: true,
  module: {
    rules: [
    ]
  }
};

module.exports = config;
