const path = require( 'path' );

const mode = process.env.NODE_ENV;

const configFileName = mode === "development" ? "./tsconfig.dev.json" : "./tsconfig.prod.json";

module.exports = {
    mode,
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
    },
    ts: { configFileName }
};