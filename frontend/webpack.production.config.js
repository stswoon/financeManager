var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";
const GATEWAY = process.env.GATEWAY || "https://stswoon-fm-gateway.herokuapp.com";

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'
    }),
    exclude: ['node_modules']
}, {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!less-loader?outputStyle=expanded'
    }),
    exclude: ['node_modules']
}, { //https://maxfarseer.gitbooks.io/redux-course-ru/content/eslint.html; https://www.robinwieruch.de/react-eslint-webpack-babel/
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
});


const DEBUG_PROD = false; //todo uncomment devtool and comment UglifyJsPlugin depends on it

module.exports = {
    entry: [
        "babel-polyfill",
        './src/index.jsx'
    ],
    output: {
        publicPath: '/', //https://github.com/jantimon/html-webpack-plugin/issues/156
        path: path.join(__dirname, './public'),
        filename: 'bundle-[chunkhash].js',
        libraryTarget: 'umd'
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
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),

        new ExtractTextPlugin({
            filename: 'style-[chunkhash].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            },
            envData: {
                gateway: GATEWAY
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ]
};
