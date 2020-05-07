'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
<<<<<<< HEAD
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
=======

module.exports = {
>>>>>>> f9c9ef3... todo: refactr the code
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

<<<<<<< HEAD
=======
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

>>>>>>> f9c9ef3... todo: refactr the code
    plugins: [
        new HtmlWebpackPlugin({
            template: 'example/index.html'
        })
    ],

<<<<<<< HEAD
=======
    optimization: {
        minimize: false
    },

>>>>>>> f9c9ef3... todo: refactr the code
    devServer: {
        contentBase: path.join(__dirname, './example'),
        compress: true,
        port: 9000
    }
<<<<<<< HEAD
});
=======
};
>>>>>>> f9c9ef3... todo: refactr the code
