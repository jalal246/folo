# @folo/withContext

> micro HOC compose component accepts custom context values as props

<hr />
<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folo/withContext.svg)](https://www.npmjs.com/package/@folo/withContext)
[![NPM Download](https://img.shields.io/npm/dt/@folo/withContext.svg)](https://www.npmjs.com/package/@folo/withContext)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folo/withContext)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folo/withContext)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folo/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jalal246/folo.svg?branch=master)](https://travis-ci.org/jalal246/folo)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folo.svg)](https://codecov.io/gh/jalal246/folo)
<!-- prettier-ignore-end -->

## Installation

```
npm install @folo/withContext
```

## Usage

```js
import withContext from "@folo/withContext";

const ComponentWithContext = withContext({
  Component: MyComponent,
  Consumer,
  contextProps: ["prop1", "prop4"] // with no contextProps provided, it accepts all context props
});
```

You can compose all context props by not passing `contextProps`

```js
const ComponentWithAllContextProps = withContext({
  Component: MyComponent,
  Consumer
});
```

## License

This project is licensed under the [MIT License](https://github.com/jalal246/folo/blob/master/LICENSE)
