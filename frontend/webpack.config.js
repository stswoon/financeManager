const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

let prod = process.env.NODE_ENV == "production";
console.log("anneq::prod=", prod, "process.env.NODE_ENV=" + process.env.NODE_ENV + "|");
//prod = true; //todo
//todo html reloading
//todo
const cssDev = ["style-loader", "css-loader", "less-loader"];
//     [{
//         loader: "style-loader" // creates style nodes from JS strings
//     }, {
//         loader: "css-loader" // translates CSS into CommonJS
//     }, {
//         loader: "less-loader" // compiles Less to CSS
//     }]
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "less-loader"]//,
    //publicPath: "./dist"
});
const cssConfig = prod ? cssProd : cssDev;


//todo: pretty bundle in dev, source maps

//https://github.com/jantimon/html-webpack-plugin#configuration
const browserConfig = {
    entry: {
        app: "./src/index.js",
        admin: "./src/admin.js" //todo: css bundle
    },
    output: {
        // libraryTarget: "umd"
        //path: __dirname + "/dist",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            // {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {
                test: /\.less$/,
                //exclude: /node_modules/,
                use: cssConfig
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //exactly without quotes
                use: "react-hot-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //exactly without quotes
                use: "babel-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/, //exactly without quotes
                //use: "file-loader" //generates hash name
                use: [
                    "file-loader?name=[name]-[hash:6].[ext]",
                    "image-webpack-loader" //compress
                ]
                //todo how to invalidate cache?
            }
        ]
    },
    //https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only", //"normal" or "verbose"
        hot: true
        //https, colors, hot, overlay (for errors), proxy for backend, progress, setup (for express and backe emulation)
        //watchContentBase to watch, watchOptions: polling
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            excludeChunks: ["admin"]
            //favicon, minify, hash, cache, showErrors
        }),
        new ExtractTextPlugin({
            filename: "main.css",
            disable: !prod//,
            //excludeChunks: ["admin"] //todo
        }),
        new HtmlWebpackPlugin({
            filename: "admin.html",
            template: "./src/admin.html",
            chunks: ["admin"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

// const serverConfig = JSON.parse(JSON.stringify(browserConfig));
// serverConfig.entry = "./src/server/index.js";
// serverConfig.target = "node";
// serverConfig.output = {
//     path: path.resolve(__dirname, "dist"),
//     filename: "server.js",
//     libraryTarget: "commonjs2"
// };
// //serverConfig.module.rules[3].emit = false;//for pictures
// serverConfig.module.rules[0] = { //for css
//     test: /\.css$/,
//     use: [
//         {
//             loader: "css-loader/locals"
//         }
//     ]
// };
const serverConfig = {
    entry: "./src/server/index.js",
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "file-loader",
                options: {
                    name: "dist/[name].[ext]",
                    //publicPath: url => url.replace(/public/, ""),
                    emit: false
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader/locals"
                    }
                ]
            },
            {
                test: /js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: { presets: ["react-app"] }
            }
        ]
    }
};

module.exports = [browserConfig, serverConfig];