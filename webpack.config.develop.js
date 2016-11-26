var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true', 
        path.join(__dirname, 'src/application.js')
    ],
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
    },
    resolve: { extensions: ['', '.js', '.jsx'] },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-decorators-legacy'
                    ],
                    compact: false
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'url-loader?limit=10000&name=[name].[ext]'
            },
            {
                test: /.*\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.min.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body',
            filename: 'index.html'
        })
    ]
};