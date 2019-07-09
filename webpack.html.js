const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPageNames = ['index', 'opensource', 'about', 'error'];

/**
 * All static pages which require webpack processing
 * @type {string[]}
 */
exports.htmlPageNames = htmlPageNames;

/**
 * Generates object with webpack entries
 * @return {object}
 */
exports.webpackEntries = () => htmlPageNames.reduce((obj, pageName) => {
  obj[pageName] = `./app/page-${pageName}/main.js`;
  return obj;
}, {});

/**
 * Generates list of html plugins for webpack
 * @type {HtmlWebpackPlugin[]}
 */
exports.webpackHtmlPlugins = () => htmlPageNames.map(pageName => new HtmlWebpackPlugin({
  template: `./app/page-${pageName}/tmpl.html`,
  inject: true,
  chunks: [pageName],
  filename: `${pageName}.html`
}));
