# Prerequisites

- [Node.js](https://nodejs.org/en/) >= v10 must be installed.
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Installation

- Run `yarn` in the repository's root directory to install everything you need
  for development.
- Run `yarn build` in the root directory to build the modules.

## Running Tests

- `yarn test` to run the tests in each package available in workspace.

## Dealing with packages

- Use `yarn workspace` followed by Folo package name in `package.json`.
  So, If you deal with `folo-layout` for example you can use:

  `yarn workspace @folo/layout add -D dotenv`

## Documentation

- Run above installation steps and then
- Run `yarn storybook` runs story for each modules.
