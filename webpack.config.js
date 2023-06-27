const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MODE, hash_php_file } = require('./library/constants/global');
 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ignored = [hash_php_file];
module.exports = {
  mode: MODE,

  devtool: 'source-map',

  entry: {
    app: path.resolve(__dirname, 'src', 'app', 'js', 'app.js'),
  },
  output: {
    publicPath: '/',

    path: path.resolve(__dirname.replace('webpack', ''), 'dist'),
    filename: ({ chunk: name }) => {
      return name === 'main'
        ? '[name]-wp[fullhash].js'
        : '[name]/[name]-wp[fullhash].js';
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            },
          },
          'postcss-loader',
          // source map sass-loader

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      // other minimizers can be added here
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // minimize tre

      filename: ({ chunk: { name } }) => {
        return name === 'main'
          ? '[name]-wp[fullhash].css'
          : '[name]/[name]-wp[fullhash].css';
      },
    }),
  ],
};
