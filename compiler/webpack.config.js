const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const sourceMap = isDevelopment;
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  target: 'webworker',
  devtool: 'eval',
  entry: {
    admin: path.resolve(__dirname, '../admin/src/index.js'),
    proxy: path.resolve(__dirname, '../proxy/src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../assets'),
    publicPath: '/assets/',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ]
          }
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
      },
      {
        test: /\.css$/,
        include: path.resolve(
          __dirname,
          '../admin/node_modules/@shopify/polaris'
        ),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap,
              modules: true,
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
};
