const path = require('path');

process.noDeprecation = true;

module.exports = {
  entry: {
    bar: './examples/bar/index.js',
    line: './examples/line/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/src'
  },
  devServer: {
    hot: false,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  watch: true,
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
          // creates style nodes from JS strings
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS
          loader: 'css-loader'
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      }
    ]
  }
};
