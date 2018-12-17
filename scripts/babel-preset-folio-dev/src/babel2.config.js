module.exports = ({
  BUILD_FORMAT = process.env.BUILD_FORMAT,
  BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV || "development"
}) => {
  const preset = {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          modules: BABEL_ENV === "test" ? "cjs" : false,
          loose: true
        }
      ],

      [require.resolve("@babel/preset-react")]
    ],

    plugins: [
      [
        // By default, this plugin uses Babel's extends helper which polyfills Object.assign.
        // Enabling useBuiltIns option will use Object.assign directly.
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
      ]
    ]
  };

  if (BABEL_ENV === "test") {
    preset.plugins.push.apply(preset.plugins, [
      [
        // remove inused code
        require.resolve("babel-plugin-istanbul")
      ]
    ]);
  } else if (BABEL_ENV === "production") {
    preset.plugins.push.apply(
      preset.plugins,
      [
        [
          require.resolve("babel-plugin-transform-react-remove-prop-types"),
          {
            mode: "remove",
            removeImport: true
          }
        ]
      ],
      [
        // remove inused code
        require.resolve("babel-plugin-minify-dead-code-elimination")
      ],
      [
        require.resolve("@babel/plugin-transform-runtime"),
        {
          useESModules: BUILD_FORMAT !== "cjs"
        }
      ]
    );
  }

  return preset;
};
