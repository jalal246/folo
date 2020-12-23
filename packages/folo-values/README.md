# @folo/values

> micro form components return input values with zero config

<hr />

<!-- gif made by: https://github.com/NickeManarin/ScreenToGif/wiki/help  -->

![live example](https://raw.githubusercontent.com/jalal246/folo/master/packages/folo-values/foloValues-demo.gif)

<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folo/values.svg)](https://www.npmjs.com/package/@folo/values)
[![NPM Download](https://img.shields.io/npm/dt/@folo/values.svg)](https://www.npmjs.com/package/@folo/values)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folo/values)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folo/values)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folo/blob/master/LICENSE)
[![CI](https://img.shields.io/github/workflow/status/jalal246/folo/CI)](https://github.com/jalal246/folo/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folo.svg)](https://codecov.io/gh/jalal246/folo)
<!-- prettier-ignore-end -->

## Installation

```
npm install @folo/values
```

## Usage

```js
import { Form, Field } from "@folo/values";

const MyComponent = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <label>
      username:
      <Field valueKey="myName" type="text" />
    </label>
    <label>
      password:
      <Field valueKey="myPass" type="password" />
    </label>
    <label>
      choose:
      <Field valueKey="alphabet" type="select">
        <option valueKey="a">A</option>
        <option valueKey="b">B</option>
        <option valueKey="c">C</option>
      </Field>
    </label>
    <button type="submit">submit</button>
  </Form>
);
// submit function will return: (event, {myName: "" myPass: "", alphabet:""})
```

### Components

```js
import { Form, Field } from "@folo/values";
```

### Components Props

All components accept custom props + children which is required in all except `Field`

<!-- all tables were generated via http://www.tablesgenerator.com/markdown_tables -->

#### Form

| property  | type          | description                                                      | default |
| --------- | ------------- | ---------------------------------------------------------------- | ------- |
| component | node/function | custom render-component                                          | form    |
| onSubmit  | function      | submit function returns values in all cells (event, {...values}) | () {}   |

#### Cell

Essential to register values in the store, returns its value when submit.

| property  | type          | description                              | default         |
| --------- | ------------- | ---------------------------------------- | --------------- |
| component | node/function | custom render-component                  | div             |
| valueKey  | string        | key used to store value in values object | id or timestamp |
| value     | string        | if type not button                       | ""              |
| checked   | Boolean       | if type button                           | false           |
| type      | Boolean       |                                          | text            |
| groupName | string        | only for button toggle group             |                 |

## License

This project is licensed under the [MIT License](https://github.com/jalal246/folo/blob/master/LICENSE)
