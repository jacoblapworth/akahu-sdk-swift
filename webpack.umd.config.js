/* eslint-disable global-require */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { version } = require('./package.json');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'react', 'umd.js'),
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist', 'umd', 'assets'),
    filename: `xui.umd.${version}.js`,
    library: 'XUI',
    libraryTarget: 'umd',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `xui.umd.${version}.css`,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    overrideBrowserslist: require('@xero/browserslist-autoprefixer'),
                  }),
                ],
              },
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};
