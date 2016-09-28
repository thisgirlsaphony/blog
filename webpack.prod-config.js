import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export default {
    debug: true,
    devtool: 'source-map', // add source maps
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: './src/index.js',
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css') // required CSS gets moved into their own bundle in dist
    ],
    module: {
        loaders: [
            //todo: add linting and babel loaders.
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
            {test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])},
            {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mim' +
            'etype=application/octet-stream'
            },
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'}
        ]
    },
    postcss: [autoprefixer({browsers: ['>1%', 'Chrome >= 4', 'Firefox >= 3', 'IE 7']})], // adds css prefixes after sass compilation
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    }
};