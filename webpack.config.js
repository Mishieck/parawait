const path = require( 'path' );

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
        library: 'awaitAll',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};