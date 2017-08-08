exports.config = ({ entry, buildPath }) => ({
  entry: {
    app: entry,
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
});
