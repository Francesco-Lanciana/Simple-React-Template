const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, '../app'),
  build: path.join(__dirname, '../build'),
};

// Highest quality source map - GET RID OF WHEN ACTUALLY DEVELOPING
const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
  },
  parts.clean({
    root: path.join(__dirname, '..'),
    path: 'build',
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
  parts.extractBundles([
    {
      name: 'vendor',
      chunks: ['app'],
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      chunks: ['vendor'],
      minChunks: Infinity,
    },
  ]),
  parts.extractStyleSheets(),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true}),
  }),
  parts.loadImages({
    options: {
      limit: 500, // After optimization limit
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadFonts({
    options: {
      name: './fonts/[name].[hash:8].[ext]',
      publicPath: '../',
    },
  }),
  parts.extractHTML(),
  parts.loadJavaScript({
    include: PATHS.app,
    exclude: /(node_modules|bower_components)/,
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  //parts.generateSourceMaps({ type: 'source-map' }),
]);

module.exports = () => {
  return productionConfig;
};
