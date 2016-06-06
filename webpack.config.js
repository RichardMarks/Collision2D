var webpack = require('webpack');
var path = require('path');
var env = require('yargs').argv.mode;
var libraryName = 'Collision2D';
var plugins = env === 'build' ? [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
    mangle: {screw_ie8: true, keep_fnames: true},
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
] : [];

var config = {
  entry: __dirname + '/src/Collision2D.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'c2d.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
  plugins: plugins,
};

module.exports = config;
