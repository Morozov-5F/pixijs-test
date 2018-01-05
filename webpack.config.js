const wpTSLoader   = require('awesome-typescript-loader');
const wpHTMLPlugin = require('html-webpack-plugin')

module.exports = {
    // Set entry point to index.ts
    entry: {
        index: './src/scripts/index.ts'
    },
    // Use TypeScript loader and HTML generator to generate proper HTML pages
    plugins: [
        new wpTSLoader.CheckerPlugin(),
        new wpHTMLPlugin({
            title: 'PIXI Test App',
            template: './src/html/index.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    // Exclude pixi.js from the resulting bundle -- we will take it from WEB
    externals: {
        'pixi.js': 'PIXI'
    },
    stats: 'verbose'
}