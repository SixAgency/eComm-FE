const path = require('path');

module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  globals: {
    "__DEV__": true
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],
            alias: {
              controllers: path.resolve(__dirname, './src/server/controllers'),
              components: path.resolve(__dirname, './src/components'),
              actions: path.resolve(__dirname, './src/actions'),
              store: path.resolve(__dirname, './src/reducers'),
              pages: path.resolve(__dirname, './src/pages')
            }
          }
        }
      }
    }
  },
  env: {
    "browser": true
  },
  rules: {
    "arrow-parens": "off",
    "generator-star-spacing": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/prefer-stateless-function": "off",
    "react/require-default-props": "off",
    "no-console": "off",
    "comma-dangle": [
      "error",
      "never"
    ]
  }
};
