/* eslint-disable import/no-dynamic-require, no-console */

const glob = require("glob");
const { resolve } = require("path");
const fs = require("fs");
const chalk = require("chalk");
const rimraf = require("rimraf");
const camelize = require("camelize");
const args = require("commander");

let isSilent = false;

const {
  bgBlue,
  red: { bold: red },
  yellow: { bold: yellow },
  green: { bold: green }
} = chalk;

function setSilent(value) {
  isSilent = value;
}

function msg(txt) {
  if (isSilent) {
    return;
  }
  console.log(bgBlue(`\n${txt}`));
}

function success(txt) {
  if (isSilent) {
    return;
  }
  console.log(green(`\n${txt}`));
}

function warning(txt) {
  if (isSilent) {
    return;
  }
  console.log(yellow(`\nWarning: ${txt}`));
}

function error(txt) {
  console.log(red(`\n${txt}\n\n`));
  process.exit(1);
}

/**
 * Get array of packages directory
 * @param  {String} path="./packages/*" packages folder path
 * @return {Array}                      array of packages path
 */
function getPackagesPath(path = "./packages/*") {
  msg("Getting packages path...");
  const folders = glob.sync(path);
  if (folders.length === 0) {
    error(`unable to detect any package in ${path}`);
  } else {
    success(`> found ${folders.length} packages`);
    return folders;
  }
}

/**
 * Clean directories
 * @param  {Array}  packages=[]         array of packages path
 * @param  {Array}  filenames=["dist"]  name of bundle folder
 */
function clean({ packages = [], filenames = ["dist" /* "coverage" */] } = {}) {
  msg("Clearing if there is any...");

  if (packages.length === 0) {
    error("packages array is empty");
  }

  // for each package
  packages.forEach(pkg => {
    // remove these files
    filenames.forEach(file => {
      const path = resolve(pkg, file);

      const folders = glob.sync(path);
      if (folders.length > 0) {
        rimraf.sync(path);
        success(`> removing ${file} from ${pkg}`);
      }
    });
  });
}

/**
 * Get package json for each directories
 *
 * @param {array} packages array of packages path
 * @return {array} array of objects contains json, src path and dist path
 */
function getPackagesInfo(packages) {
  msg("Reading package.json and setting packages paths");

  if (packages.length === 0) {
    error("packages array is empty");
  }

  const packagesInfo = packages.map(pkg => {
    const path = resolve(pkg, "package.json");

    try {
      // check for package readability
      fs.accessSync(path, fs.constants.R_OK);

      const json = fs.readFileSync(path, "utf8");

      const { name, peerDependencies, dependencies } = JSON.parse(json);

      // check for src/inde readability
      const sourcePath = resolve(pkg, "src", "index.js");

      fs.accessSync(sourcePath, fs.constants.R_OK);

      return {
        sourcePath,
        distPath: resolve(pkg, "dist"),
        name,
        peerDependencies,
        dependencies
      };
    } catch (e) {
      warning(`${e}`);
      return false;
    }
  });

  return packagesInfo.filter(Boolean);
}

/**
 * Sorting package
 *
 * package with no deps will come first
 * then package that depinding of package that is built
 *
 * @param  {Array} packages                   array of packages path
 * @param  {String} [accordingTo="folo" }]    sort according to which monorepo
 * @return {Array}                            array of sorted packages path
 */
function sortPackages({ packages, accordingTo = "folo" }) {
  const filtered = [];

  function addInedx(i, isClean = true) {
    if (isClean) {
      filtered.push(packages[i]);

      // remove it from unsorted
      packages.splice(i, 1);
    }
  }

  function check(arr, targetedDep) {
    let match = false;
    match = arr.find(({ name }) => name === targetedDep);
    return match;
  }

  function sort() {
    packages.forEach(({ dependencies = {} }, i) => {
      let isClean = true;

      Object.keys(dependencies).forEach(dep => {
        if (dep.includes(accordingTo)) {
          if (check(filtered, dep)) {
            isClean = true;
          } else {
            isClean = false;
          }
        }
      });
      addInedx(i, isClean);
    });
  }

  while (packages.length > 0) {
    sort();
  }

  return filtered;
}

/**
 * [Modify package name in package.json
 * remove @
 * replace / with -
 * remove - and capitalize the first letter after it
 * @param       {String} name package.json name
 * @return      {String}      modifid name for bundle
 */
function _camelize(name) {
  return camelize(name.replace("@", "").replace("/", "-"));
}

/**
 * Get args pass to build command
 * @return {Object} contains flags and array of packages name
 */
function getArgs() {
  return args
    .option("-s, --silent", "silent mode, mutes build massages")
    .option("-w, --watch", "watch mode")
    .option("--format [format]", "specific build format")
    .option("-m, --minify", "minify bundle works only if format is provided")
    .option("PACKAGE_NAME", "for building specific package[s]")
    .parse(process.argv);
}

module.exports = {
  msg,
  success,
  warning,
  error,
  setSilent,

  getPackagesPath,
  clean,
  getPackagesInfo,
  camelize: _camelize,
  getArgs,
  ms: require("ms"),
  sortPackages
};
