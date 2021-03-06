module.exports = {
  extends: ["airbnb", "prettier", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "linebreak-style": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "comma-dangle": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-unresolved": ["error", { ignore: ["^react$"] }],
    "import/no-extraneous-dependencies": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["packages/**/stories/*.stories.js"],
      rules: {
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/label-has-for": "off",
      },
    },
    {
      files: ["packages/**/test/*.test.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
