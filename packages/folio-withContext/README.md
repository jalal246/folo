# @folio/withContext

> micro HOC compose component accepts custom context values as props

<hr />
<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folio/withContext.svg)](https://www.npmjs.com/package/@folio/withContext)
[![NPM Download](https://img.shields.io/npm/dt/@folio/withContext.svg)](https://www.npmjs.com/package/@folio/withContext)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folio/withContext)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folio/withContext)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folio/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jalal246/folio.svg?branch=master)](https://travis-ci.org/jalal246/folio)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folio.svg)](https://codecov.io/gh/jalal246/folio)
<!-- prettier-ignore-end -->

## Installation

```
npm install @folio/withContext
```

## Usage

```js
import withContext from "@folio/withContext";

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

This project is licensed under the [MIT License](https://github.com/jalal246/folio/blob/master/LICENSE)
