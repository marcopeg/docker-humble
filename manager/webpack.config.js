const webpack = require('webpack');
const path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');

let webpackConfig = {
    entry: {
        home: [
            'webpack/hot/dev-server',
            path.join(APP_DIR, 'home.js')
        ],
    },
    output: {
        filename: '[name].js',
        library: '[name]',
        publicPath: '/build',
        path: './build/',
    },
    module: {
        loaders: [
            {
                test : /\.jsx?/,
                loader : 'babel',
                include: APP_DIR,
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
    ]
};

module.exports = webpackConfig;
