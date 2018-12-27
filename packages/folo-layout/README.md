# @folo/layout

> micro CSS grid react-components

<hr />
<!-- gif made by: https://github.com/NickeManarin/ScreenToGif/wiki/help  -->

![live example](https://raw.githubusercontent.com/jalal246/folo/master/packages/folo-layout/foloLayout-demo.gif)

<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folo/layout.svg)](https://www.npmjs.com/package/@folo/layout)
[![NPM Download](https://img.shields.io/npm/dt/@folo/layout.svg)](https://www.npmjs.com/package/@folo/layout)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folo/layout)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folo/layout)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folo/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/jalal246/folo/tree/master.svg?style=svg)](https://circleci.com/gh/jalal246/folo/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folo.svg)](https://codecov.io/gh/jalal246/folo)
<!-- prettier-ignore-end -->

## Installation

```
npm install @folo/layout
```

## Usage

```js
import { FoloLayout, Grid, GridItem } from "@folo/layout";

const MyGrid = () => (
  <FoloLayout>
    <Grid>
      <GridItem col={4} row={1}>
        item
      </GridItem>
      <GridItem col={3} row={2}>
        item
      </GridItem>
      <GridItem col={2} row={3}>
        item
      </GridItem>
      <GridItem col={1} row={5}>
        item
      </GridItem>
      <GridItem col={4} row={10}>
        item
      </GridItem>
    </Grid>
  </FoloLayout>
);
```

### Components

```js
import { FoloLayout, Grid, GridItem } from "@folo/layout";
```

### Components Props

All components accept custom props + children which is required in all.

<!-- all tables were generated via http://www.tablesgenerator.com/markdown_tables -->

#### Grid

| property    | type          | description               | default |
| ----------- | ------------- | ------------------------- | ------- |
| component   | node/function | custom render-component   | div     |
| col         | number        | number of columns in grid |         |
| colWidth    | string        | fixed column width        |         |
| colMinWidth | string        | column minimum width      | auto    |
| colMaxWidth | string        | column maximum width      | 1fr     |
| row         | number        | number of rows in grid    |         |
| rowWidth    | string        | fixed row width           |         |
| rowMinWidth | string        | row minimum width         | auto    |
| rowMaxWidth | string        | row maximum width         | 1fr     |

#### GridItem

Used for implicit grid layout.

| property     | type          | description               | default |
| ------------ | ------------- | ------------------------- | ------- |
| component    | node/function | custom render-component   | div     |
| row          | number        | number of columns in grid |         |
| toRow        | number        | column width              |         |
| col          | number        | column minimum width      | 0       |
| toCol        | number        | column maximum width      |         |
| isCenter     | Boolean       | number of rows in grid    | false   |
| isHorizontal | Boolean       |                           | true    |

## License

This project is licensed under the [MIT License](https://github.com/jalal246/folo/blob/master/LICENSE)
