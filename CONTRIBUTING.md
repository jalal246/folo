<!-- forked form: emotion: https://github.com/emotion-js/emotion/blob/master/CONTRIBUTING.md -->

## Prerequisites

- [Node.js](http://nodejs.org/) >= v8 must be installed.
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

In the repository's root directory:

- Run `yarn` to install everything you need for development.
- Run `yarn build` to build the modules.

> NOTE:
>
> lerna is **NOT** used for installing packages. Only yarn is used. lerna is only used for publishing

## Tests

- `yarn test` will run the tests once.
- `yarn test:watch` will run the tests on every change.
- `yarn cover` will run the tests and produce a coverage report in `coverage/`.
- `yarn check-cover` to check coverage percentage.

## Building

- Run `yarn build` in the root directory to build the modules.
  build accepts flags:

  `--silent`: mutes build massages.

  `--watch`: for watch mode.

  `PACKAGE_NAME`: for building specific package.

  _Example:_

  ```js
    build-custom: "node scripts/folo-build  @folo/forms --silent --watch",
  ```

- Run `yarn build-storybook` to build the static version of modules.

## Documentation and Development

- Run above installation steps and then
- Run `yarn storybook` runs story for each modules.
