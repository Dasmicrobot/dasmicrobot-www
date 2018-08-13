const path = require('path');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './app/page-index/main.js',
    randd: './app/page-randd/main.js',
    services: './app/page-services/main.js',
    error: './app/page-error/main.js'
  },
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
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
        test: /\.(scss|css|sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              // translates CSS into CommonJS
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ],
          fallback: 'style-loader'
        }),
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/page-index/tmpl.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-randd/tmpl.html',
      inject: 'body',
      chunks: ['randd'],
      filename: 'randd.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-services/tmpl.html',
      inject: 'body',
      chunks: ['services'],
      filename: 'services.html'
    }),
    new HtmlWebpackPlugin({
      template: './app/page-error/tmpl.html',
      inject: 'body',
      chunks: ['error'],
      filename: 'error.html'
    }),
    new CleanWebpackPlugin(buildPath),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './app/images/logo.svg',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Dasmicrobot',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new ExtractTextPlugin('styles.[md5:contenthash:hex:20].css', {
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: {
          inline: false,
        },
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ]
};
