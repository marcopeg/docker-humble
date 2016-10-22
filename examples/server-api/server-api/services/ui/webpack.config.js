
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            APP_DIR + '/app.js'
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'app.js',
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'node_modules',
            path.join(APP_DIR),
        ],
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loaders : ['babel'],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    babel: {
        plugins: [
            'transform-decorators',
            'transform-class-properties',
            'transform-object-rest-spread',
        ],
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            index: '/index.html',
        },
        stats: {
            colors: true,
        },
    },
};

if ('development' === process.env.NODE_ENV) {
    config.devtool = 'source-map';
}

if ('production' === process.env.NODE_ENV) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }));
}

module.exports = config;
