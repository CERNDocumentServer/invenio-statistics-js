const path = require('path');

process.noDeprecation = true;

module.exports = {
  entry: './src/index.js',
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin() // Enable HMR
  // ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/src'
  },
  devtool: 'source-map',
  devServer: {
    hot: false,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
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
      },
      {
        test: /\.js$/,
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        exclude: /node_modules|\.spec\.js$/
      }
        // {
        //   enforce: "pre",
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "eslint-loader",
        //   options: {
        //     emitError: true,
        //     failOnError: true
        //   }
        // }
    ]
  }
};