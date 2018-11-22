const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {cpus} = require('os');
const {join} = require('path');
const {lib: {entries}} = require('serverless-webpack');
const externals = require('webpack-node-externals');

module.exports = {
  entry: entries,
  externals: [
    externals()
  ],
  mode: 'none',
  module: {
    rules: [
      {
        loader: 'cache-loader'
      },
      {
        loader: 'thread-loader',
        options: {
          workers: cpus().length - 1
        }
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    nodeEnv: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: join(__dirname, '.webpack'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  target: 'node'
};
