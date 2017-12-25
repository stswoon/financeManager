// todo https://www.codementor.io/drewpowers/high-performance-webpack-config-for-front-end-delivery-90sqic1qa

var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//var RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
// var CSPWebpackPlugin = require('csp-webpack-plugin');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '9000';
const GATEWAY = process.env.GATEWAY || 'https://stswoon-fm-gateway.herokuapp.com';

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
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router', 'highcharts'], //remove 'jQuery' from here because it cause t.nodeName.toLowerCase error
        app: ['./src/index.jsx']
        //app: ["babel-polyfill", './src/index.jsx']
    },
    output: {
        publicPath: '/', //https://github.com/jantimon/html-webpack-plugin/issues/156
        path: path.join(__dirname, './public'),
        filename: 'bundle-[name]-[chunkhash].js',
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
                NODE_ENV: '"production"',
                PLATFORM: '"web"'
            }
        }),
        new webpack.ContextReplacementPlugin( //https://habrahabr.ru/company/jugru/blog/342842/
            /moment[\/\\]locale$/,
            /en|ru/
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ //https://habrahabr.ru/post/307694/, https://webpack.js.org/plugins/commons-chunk-plugin/
            name: 'vendor'
            //children: true,
            //async: true
        }),
        //new BundleAnalyzerPlugin(), //only for dev

        new ExtractTextPlugin({
            filename: 'style-[chunkhash].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            },
            //favicon: 'src/favicon.png',
            faviconWithHash: 'src/favicon.png' + '?hash=' + (new Date()).getTime(),
            envData: {
                gateway: GATEWAY,
                serverLogin: true
            }
        }),
        new CopyWebpackPlugin([
            {from: 'src/favicon.png', to: 'favicon.png'},
        ]),
        // new CSPWebpackPlugin({
        //     'default-src': "'self'",
        //     'connect-src': ["'self'", "stswoon-fm-gateway.herokuapp.com"]
        // }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // This message obscures real errors so we ignore it.
                    // https://github.com/facebookincubator/create-react-app/issues/2612
                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: '/',
            //navigateFallback: '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /\/dashboard/],
            //https://github.com/goldhand/sw-precache-webpack-plugin/issues/59 - because of SW + SSR
            // dynamicUrlToDependencies: {
            //
            // }
            // runtimeCaching: [{
            //     "urlPattern": "/dashboard/(.*)",
            //     "handler": "networkFirst"
            // }]
        }),
    ]
};
