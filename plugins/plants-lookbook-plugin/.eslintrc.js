module.exports = {
    extends: [
      "plugin:@wordpress/eslint-plugin/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "eslint:recommended"
    ],
    plugins: [
      "react",
      "@typescript-eslint"
    ],
    rules: {
      "react/react-in-jsx-scope": "off"
    },
    ignorePatterns: ["vendor/*", "node_modules/*", "webpack.config.js", "tsconfig.json", ".eslintrc.js", "dist/*"],
    env: {
      browser: true
    }
  };