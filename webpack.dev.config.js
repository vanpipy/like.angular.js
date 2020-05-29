'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'development',

    entry: {
        likeAngularJS: path.resolve(__dirname, './src/main.js'),
        script: path.resolve(__dirname, 'example/index.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'example/index.html'
        })
    ],

    optimization: {
        minimize: false
    },

    devServer: {
        contentBase: path.join(__dirname, './example'),
        compress: true,
        port: 9000
    },

    devtool: 'eval-source-map',
});
