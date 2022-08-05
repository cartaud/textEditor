const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './client/src/js/index.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './client/index.html',
                title: 'jate'
            }),

            new GenerateSW(),
            new WebpackPwaManifest({
                name: 'Just Another Text Editor',
                short_name: 'JATE',
                description: 'A text editor that can be run in browser while offline',
                background_color: '',
                theme_color: '',
                start_url: '/',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve('./client/src/images/logo.png'),
                        size: 96,
                        destination: path.join('assets', 'icons'),
                    },
                ],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                        },
                    },
                },
            ],
        },
    };
};