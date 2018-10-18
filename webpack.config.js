const { resolve } = require("path");
const rimraf = require("rimraf");

module.exports = env => {
  const bundleFolder = env.BUNDLE_FOLDER || "dist";
  const libraryFolder = env.TARGET_FOLDER || "src";
  const fileNameBase = env.FILE_NAME_BASE || "index";

  const path = resolve(__dirname, bundleFolder);

  rimraf.sync(path);

  const entry = `./${libraryFolder}`;
  const library = libraryFolder;
  const config = ({ libraryTarget, isProduction }) => {
    let filename;
    let mode;

    if (isProduction) {
      filename = `${fileNameBase}.${libraryTarget}.min.js`;
      mode = "production";
    } else {
      filename = `${fileNameBase}.${libraryTarget}.js`;
      mode = "development";
    }

    return {
      entry,
      target: libraryTarget === "commonjs2" ? "node" : "web",
      // externals: [nodeExternals()],
      output: {
        path,
        library,
        filename,
        libraryTarget
      },
      module: {
        rules: [
          {
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      resolve: {
        extensions: ["*", ".js", ".jsx"]
      },
      mode
    };
  };

  return [
    config({ libraryTarget: "commonjs2" }),
    config({ libraryTarget: "umd" }),
    config({ libraryTarget: "umd", isProduction: true })
  ];
};
