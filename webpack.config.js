const path = require('path');
const merge = require('webpack-merge');

const parts = require('./config/webpack.parts');
const common = require('./config/webpack.common');
const devConfig = require('./config/webpack.development');
const prodConfig = require('./config/webpack.production');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  common.config({
    entry: PATHS.app,
    buildPath: PATHS.build,
  }),
  {
    context: PATHS.app,
  },
]);

module.exports = (env) => {

  if (env === 'production') {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);

};
