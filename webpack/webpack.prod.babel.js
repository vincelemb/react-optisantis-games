import path from 'path';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';

import baseConfig, { PROJECTS } from './webpack.config';

const babelRegex = /\.(js|ts)x?$/;
const cssRegex = /\.css$/;
const sassRegex = /\.(s(a|c)ss)$/;

export default merge.smart(baseConfig, {
    mode: 'production',
    target: 'web',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, `../dist`),
        publicPath: `dist`,
    },
    module: {
        rules: [
            {
                test: babelRegex,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                    useBuiltIns: 'usage',
                                    corejs: '3',
                                    modules: false,
                                },
                            ],
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-typescript',
                                {
                                    allowNamespaces: true,
                                },
                            ],
                            'react-hot-loader/babel',
                            '@babel/plugin-transform-modules-commonjs',
                            '@babel/plugin-transform-arrow-functions',
                            '@babel/plugin-transform-destructuring',
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            '@babel/plugin-transform-classes',

                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-proposal-export-default-from',
                            '@babel/plugin-proposal-logical-assignment-operators',
                            ['@babel/plugin-proposal-optional-chaining', { loose: false }],
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            '@babel/plugin-proposal-function-sent',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-proposal-throw-expressions',
                            '@babel/plugin-proposal-json-strings',
                            '@babel/plugin-proposal-object-rest-spread',

                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-syntax-import-meta',

                            'babel-plugin-macros',
                        ],
                    },
                },
            },
            {
                test: cssRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: sassRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js',
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: { debug: true },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
        new WebpackBuildNotifierPlugin({
            title: `Project built`,
            suppressWarning: true,
        }),
    ],
    devtool: 'none',
    performance: {},
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react\-dom|react)\S+[\\/]/,
                    name: 'react.bundle',
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](?!(react|react\-dom|core\-js|redux|connected\-react\-router|(socket|engine)\.io\-(client|parser)))\S+[\\/]/,
                    name: 'vendors.bundle',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
});
