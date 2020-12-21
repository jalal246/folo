module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {},
  plugins: ["tree-shaking", "jest"],
};
