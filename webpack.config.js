const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/like.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'like.js',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: false
    }
};
