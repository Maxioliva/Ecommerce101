const path = require('path');
const { DefinePlugin } = require('webpack');
const JsMinimizerPlugin = require('terser-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TypeCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const { NODE_ENV } = process.env;
const IS_DEVELOPMENT = NODE_ENV !== 'production';

module.exports = {
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  stats: IS_DEVELOPMENT ? 'minimal' : 'normal',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'ecoo.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: '3.17',
                  },
                ],
              ],
              plugins: IS_DEVELOPMENT ? ['react-refresh/babel'] : undefined,
            },
          },
        ],
        exclude: /[\\/]node_modules[\\/](?!(@googlemaps[\\/]js-api-loader)[\\/])/,
      },
      {
        test: /\.scss$/,
        use: [
          IS_DEVELOPMENT ? 'style-loader' : CssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [['postcss-preset-env', { autoprefixer: { grid: 'autoplace' } }]] } },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new DefinePlugin({
      IS_DEVELOPMENT,
    }),
    new TypeCheckerPlugin(),

    new HtmlPlugin({
      template: './public/index.html',
    }),
    ...(IS_DEVELOPMENT ? [new ReactRefreshPlugin()] : [new CssExtractPlugin({ filename: 'ay-checkout-base.min.css' })]),
  ],
  optimization: {
    minimize: !IS_DEVELOPMENT,
    minimizer: [
      new JsMinimizerPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devtool: !IS_DEVELOPMENT ? 'source-map' : undefined,
  devServer: {
    hot: true,
    port: 3000,
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
};
