module.exports = () => {
  const { BUILD_FORMAT, BABEL_ENV } = process.env;

  const preset = {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          modules: false,
          loose: true
        }
      ],

      [require.resolve("@babel/preset-react")]
    ],

    plugins: [
      // By default, this plugin uses Babel's extends helper which polyfills Object.assign.
      // Enabling useBuiltIns option will use Object.assign directly.
      [
        require.resolve("@babel/plugin-proposal-object-rest-spread"),
        {
          useBuiltIns: true
        }
      ],

      // Compile export default to ES2015
      [require.resolve("@babel/plugin-proposal-export-default-from")],

      // This plugin transforms static class properties as well as properties declared with the property initializer syntax
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        { loose: true }
      ],

      // remove inused code
      require.resolve("babel-plugin-minify-dead-code-elimination")
    ]
  };

  preset.plugins.push.apply(preset.plugins, [
    [
      require.resolve("@babel/plugin-transform-runtime"),
      { useESModules: BUILD_FORMAT !== "cjs" }
    ]
  ]);

  if (BABEL_ENV === "production") {
    preset.plugins.push.apply(preset.plugins, [
      [
        require.resolve("babel-plugin-transform-react-remove-prop-types"),
        {
          mode: "remove",
          removeImport: true
        }
      ]
    ]);
  } else if (BABEL_ENV === "test") {
    ["babel-plugin-istanbul"];
  }

  return preset;
};
