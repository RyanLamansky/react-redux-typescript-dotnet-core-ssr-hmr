const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');

process.traceDeprecation = true;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        mode: isDevBuild ? 'development' : 'production',
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    enforce: 'pre',
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                            configuration: {
                                rules: {
                                    'align': [true, 'parameters', 'arguments', 'statements', 'members', 'elements'],
                                    'array-type': [true, 'array'],
                                    'binary-expression-operand-order': true,
                                    'class-name': true,
                                    'curly': true,
                                    'import-spacing': true,
                                    'new-parens': true,
                                    'no-consecutive-blank-lines': true,
                                    'no-irregular-whitespace': true,
                                    'no-trailing-whitespace': true,
                                    'one-line': [true, 'check-catch', 'check-finally', 'check-else', 'check-open-brace', 'check-whitespace'],
                                    'ordered-imports': [true, {
                                        'import-sources-order': 'any',
                                        'named-imports-order': 'case-insensitive'
                                    }],
                                    'prefer-const': true,
                                    'prefer-template': true,
                                    'quotemark': [true, 'single'],
                                    'semicolon': [true, 'always'],
                                    'switch-final-break': [true, 'always'],
                                    'triple-equals': true,
                                    'variable-name': [true, 'ban-keywords', 'check-format'],
                                    'whitespace': [true, 'check-branch', 'check-operator', 'check-typecast']
                                }
                            }
                        }
                    }
                    ]
                },
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.NormalModuleReplacementPlugin(
                /\/iconv-loader$/, 'node-noop',
            )]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        'css-hot-loader',
                        miniCssExtractPlugin.loader,
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        'sass-loader'
                    ]
                }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        performance: {
            maxAssetSize: 350000,
            maxEntrypointSize: 350000
        },
        plugins: [
            new miniCssExtractPlugin({
                filename: 'site.css'
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.tsx' },
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};