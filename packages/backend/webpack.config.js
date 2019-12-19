const path = require('path')
const outputDirectory = '/dist'
const webpack = require('webpack')
const fs = require('fs')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    index: ['./src/app.ts']
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  // node: {
  //   global: true,
  //   fs: 'empty'
  // },
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
    new Dotenv({
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    }),
    new CopyPlugin([
      {from: './api-documentation.yaml'}
    ])
  ]
}
