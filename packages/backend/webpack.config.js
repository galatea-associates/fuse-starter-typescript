const path = require('path')
const outputDirectory = '/dist'
const webpack = require('webpack')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: {
    index: ['./src/index.ts']
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].js',
    publicPath: '/'
  },
  node: {
    global: true,
    fs: 'empty'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
    ]
  },
  plugins: [
    new CopyPlugin([
      {from: "config", to: "config"}
    ])
  ]
}
