const mainConfig = require('./webpack.config')
const path       = require('path')

// Webpack plugins/utilities
const wpDashboard   = require('webpack-dashboard/plugin')
const wpFileManager = require('filemanager-webpack-plugin')
const wpMerge       = require('webpack-merge')
const wpTSLoader    = require('awesome-typescript-loader')

// Various options that related
const outputDir  = 'dev'
const publicPath = ''
const tsConfig   = 'tsconfig.dev.json'

// File manager options (copy assets to an output directory). Moved to separate
// object to improve readability
const wpFileManagerOptions = {
    onEnd: {
        copy: [
            {
                source: path.resolve(__dirname, 'assets'),
                destination: path.resolve(__dirname, outputDir) + '/assets'
            }
        ]
    }
}

// Developmen-specific webpack config
const devConfig = {
    // Configure an output path for a resulting bundle
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name].bundle.js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous'
    },
    // Configure rules for different file types
    module: {
        rules: [
            // TypeScript files
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: tsConfig
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // CSS files
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            // SASS files
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: false,
                            sass: true
                        }
                    }
                ]
            }
        ]
    },
    // Enable various webpack plugins like dashboard (to watch our web server
    // stats) or filemanager plugin (to copy assets folder after webpack build)
    // NOTE: we could use 'file-loader' webpack loader to handle assets copying,
    // but the way I see it, it's better to use separate asset directory with
    // images, fonts, etc. and copy the whole directory to the output folder
    plugins: [
        new wpFileManager(wpFileManagerOptions),
        new wpDashboard(),
        new wpTSLoader.TsConfigPathsPlugin({ configFileName: tsConfig })
    ],
    // Enable a source mapping using a source-map tool
    devtool: 'inline-source-map',
    // Start a WEB-server on localhost:9000
    devServer: {
        contentBase: path.join(__dirname, outputDir),
        compress: false,
        host: '0.0.0.0',
        port: 9000,
        publicPath: publicPath,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        }
    }
}

module.exports = wpMerge(mainConfig, devConfig)