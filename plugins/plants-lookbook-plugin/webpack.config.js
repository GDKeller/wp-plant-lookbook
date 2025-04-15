const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");

const jsEntries = {}
const cssEntries = {}

glob.sync("./src/blocks/*/index.tsx").forEach(file => {
    const blockName = path.basename(path.dirname(file));
    jsEntries[`blocks/${blockName}/block`] = path.resolve(__dirname, file);
});
glob.sync("./src/blocks/*/editor.scss").forEach(file => {
    const blockName = path.basename(path.dirname(file));
    cssEntries[`blocks/${blockName}/editor`] = path.resolve(__dirname, file);
});
glob.sync("./src/blocks/*/style.scss").forEach(file => {
    const blockName = path.basename(path.dirname(file));
    cssEntries[`blocks/${blockName}/style`] = path.resolve(__dirname, file);
});

module.exports = [
    {
        entry: jsEntries,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-typescript",
                                "@babel/preset-react"
                            ]
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                }
            ]
        },
        externals: {
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/block-editor": ["wp", "blockEditor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/element": ["wp", "element"],
            "@wordpress/i18n": ["wp", "i18n"]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        format: {
                            comments: false,
                        }
                    },
                })
            ]
        },
        mode: "production"
    },
    {
        entry: cssEntries,
        output: {
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                }
            ]
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ],
        mode: "production"
    }
];