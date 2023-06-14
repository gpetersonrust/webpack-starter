const path = require('path');
 
 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dist_dir, parent_dir, MODE } = require('./library/constants/global');
const HashUpdatePlugin = require('./plugins/updateHash');
const find_files_recursively = require('./library/utilities/find_files_recursively');
const ignored = find_files_recursively(
    parent_dir,
    [],
    'node_modules|.git|webpack',
    '.php$|.html$'
  );
 ignored.push(dist_dir + '/hashes.json');
  module.exports = {
  mode:  MODE,
  watchOptions: {
    // ignore changes to files in parent_dir
    ignored,
  },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk: { name } }) => {
        return name === 'main'
          ? '[name]-wp[fullhash].css'
          : '[name]/[name]-wp[fullhash].css';
      },
    }),
    new HashUpdatePlugin(),
  ],
};

 