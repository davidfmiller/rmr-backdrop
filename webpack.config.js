/* global webpack */

const
  path = require('path'),
  webpack = require('webpack');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'rmr-backdrop.bundle.js'
  },
  mode: 'production',
  plugins : [
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
//        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015' ]
            ]
          }
        }]
      }
    ]
  }
};

module.exports = config;
