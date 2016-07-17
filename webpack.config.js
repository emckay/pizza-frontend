module.exports = {
    entry: {
        app: './src/main.ts',
        polyfills: './src/polyfills.ts',
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts/,
                loaders: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        contentBase: './dist',
    },
};
