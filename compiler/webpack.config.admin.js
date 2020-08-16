const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const sourceMap = isDevelopment;
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  target: 'webworker',
  devtool: 'eval',
  entry: [
    // 'react-datasheet/lib/react-datasheet.css',
    // '@shopify/polaris/styles.css',
    path.resolve(__dirname, '../admin/src/index.js')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './assets'),
    publicPath: '/assets/',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => autoprefixer(),
              sourceMap
            }
          }
        ]
      }
    ]
  }
};
