const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const glob = require("glob");

const entries = {}

// JS Entries
glob.sync("./src/blocks/*/index.ts").forEach(file => {
	const blockName = path.basename(path.dirname(file));
	entries[`blocks/${blockName}/script`] = path.resolve(__dirname, file);
});

// CSS Entries 
glob.sync("./src/blocks/*/style.scss").forEach(file => {
    const blockName = path.basename(path.dirname(file));
    entries[`blocks/${blockName}/style`] = path.resolve(__dirname, file);
});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript"
                        ],
                    }
                }
            },
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