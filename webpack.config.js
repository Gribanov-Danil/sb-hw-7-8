const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

module.exports = {
    mode,
    entry: path.resolve(__dirname, './src/index.tsx'),
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false,
                        },
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", {interlaced: true}],
                            ["jpegtran", {progressive: true}],
                            ["optipng", {optimizationLevel: 5}],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                {xmlns: "http://www.w3.org/2000/svg"},
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: path.join(__dirname, './dist'),
        compress: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
        }),
    ],
};