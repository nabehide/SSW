const path = require('path')
const webpack = require('webpack')

const appDirectory = path.resolve(__dirname, '../')

module.exports = {
  mode: 'development',
  entry: {
    javascript: path.resolve(appDirectory, 'index.web.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.web.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, './'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-native-web'],
            presets: ['react-native'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    contentBase: 'web/dist',
    port: 3002,
  },
}
