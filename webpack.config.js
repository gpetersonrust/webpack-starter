const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { MODE, hash_php_file } = require('./library/constants/global');
const HashUpdatePlugin = require('./plugins/updateHash');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ignored = [hash_php_file];
module.exports = {
  mode: MODE,
  watchOptions: {
    // ignore changes to files in parent_dir
    ignored: []
      
  },
  entry: {
    app: path.resolve(__dirname, 'src', 'app', 'js', 'app.js'),
    // front-page
    'front-page': path.resolve(
      __dirname,
      'src',
      'front-page',
      'js',
      'front-page.js'
    ),
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
          'css-loader',
          'postcss-loader',
          'sass-loader',
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
      // new CssMinimizerPlugin(),
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
