
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var webpackEnv = {};
Object.keys(process.env)
    .filter(key => key.toLowerCase().toUpperCase() === key)
    .forEach(key => {
        webpackEnv[key] = JSON.stringify(process.env[key]);
    });

var config = {
    entry: {
        app: APP_DIR + '/app.js',
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
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url!img?optimizationLevel=7',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/vnd.ms-fontobject',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=image/svg+xml',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': webpackEnv,
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
    config.plugins.push(new webpack.optimize.DedupePlugin());
}

module.exports = config;
