const path = require('path')
const outputDirectory = '/dist'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

module.exports = {
    entry: {
        index: ['./src/index.tsx']
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            }
        ]
    },
    devtool: 'sourcemaps',
    devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
        clientLogLevel: 'debug',
        http2: false,
        proxy: {
            '/api': {
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
                target: 'http://[::1]:3000'
            }
        }
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
}