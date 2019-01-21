module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "react/jsx-one-expression-per-line": "off",
    "linebreak-style": 0,
    "react/prop-types": [
      "error",
      {
        ignore: ["children"]
      }
    ]
  },
  overrides: [
    {
      files: ["packages/**/stories/*.stories.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "react/jsx-filename-extension": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/label-has-for": "off"
      }
    },
    {
      files: ["packages/**/test/*.test.jsx"],
      rules: {
        "react/prop-types": "off",
        "import/no-extraneous-dependencies": "off"
      }
    }
  ],
  globals: {
    jest: true,
    describe: true,
    it: true,
    before: true,
    after: true,
    beforeEach: true,
    afterEach: true,
    expect: true,
    render: true
  }
};
