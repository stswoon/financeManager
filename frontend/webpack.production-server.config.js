var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";
const GATEWAY = process.env.GATEWAY || "https://stswoon-fm-gateway.herokuapp.com";

const DEBUG_PROD = false; //todo uncomment devtool and comment UglifyJsPlugin depends on it

loaders.push({
    test: /\.scss$/,
    loader: "ignore-loader",
    exclude: ['node_modules']
}, {
    test: /\.less$/,
    loader: "ignore-loader",
    exclude: ['node_modules']
});

module.exports = {
    node: {
        fs: "empty", //https://github.com/webpack-contrib/css-loader/issues/447
        net: 'empty'
    },
    entry: [
        './src/server/server-ssr.js'
    ],
    output: {
        publicPath: '/', //https://github.com/jantimon/html-webpack-plugin/issues/156
        path: path.join(__dirname, './public'),
        filename: 'server-ssr.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    //devtool: 'inline-source-map',
    plugins: [
        // new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};
