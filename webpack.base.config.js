'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'likeAngularJS.js',
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

    ],

    optimization: {
        minimize: false
    }
};
