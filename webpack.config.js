var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/src'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          } , {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        },
        {
          test: /\.js$/,
          enforce: 'post',
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
          },
          exclude: /node_modules|\.spec\.js$/,
        }
      ]
    }
};
