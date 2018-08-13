const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'eval-cheap-module-source-map',

  entry: {
    index: './app/page-index/main.js',
    randd: './app/page-randd/main.js',
    services: './app/page-services/main.js',
    error: './app/page-error/main.js'
  },

  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
          // Please note we are not running postcss here
        ]
      }
      ,
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/page-index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-randd/tmpl.html',
      inject: true,
      chunks: ['randd'],
      filename: 'randd.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-services/tmpl.html',
      inject: true,
      chunks: ['services'],
      filename: 'services.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-error/tmpl.html',
      inject: true,
      chunks: ['error'],
      filename: 'error.html'
    })
  ]
};
