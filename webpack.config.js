require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniExtracCssPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: ['webpack-hot-middleware/client?reload=true', './client/index.js'],
    output: {
        filename: 'app.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'server/public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            { 
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                use: "url-loader?limit=100000"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
};