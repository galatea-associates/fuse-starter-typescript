const path = require('path')
const outputDirectory = '/dist'
const webpack = require('webpack')
const fs = require('fs')
const Dotenv = require('dotenv-webpack')

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
    publicPath: '/',
  },
  // node: {
  //   global: true,
  //   fs: 'empty'
  // },
  target: 'async-node',
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
    })
  ]
}
