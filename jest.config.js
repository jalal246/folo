module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },

  // An array of regexp pattern strings that are matched against all file paths before executing the test.
  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"]
};
