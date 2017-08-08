const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
  parts.loadStyleSheets({ exlude: /node_modules/ }),
  parts.loadImages(),
  parts.loadFonts(),
  parts.extractHTML(),
]);

module.exports = () => {
  return developmentConfig;
};
