# 📋 @folo/values

> A from store returns input values with zero config

<!-- gif made by: https://github.com/NickeManarin/ScreenToGif/wiki/help  -->

![live example](https://raw.githubusercontent.com/jalal246/folo/master/packages/folo-values/foloValues-demo.gif)

<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folo/values.svg)](https://www.npmjs.com/package/@folo/values)
[![NPM Download](https://img.shields.io/npm/dt/@folo/values.svg)](https://www.npmjs.com/package/@folo/values)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folo/values)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folo/values)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folo/blob/master/packages/folo-values/LICENSE)
[![CI](https://img.shields.io/github/workflow/status/jalal246/folo/CI)](https://github.com/jalal246/folo/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folo.svg)](https://codecov.io/gh/jalal246/folo)
<!-- prettier-ignore-end -->

## Installation

```sh
npm install @folo/values
```

- ☑️ A simple, lightweight package, comes with two components connected to global
  JavaScript store. That's it. No complexity, no unnecessary code.

- ☑️ Instead of implementing your own store, `@folo/values` can do it for you with a
  store that holds inputs and knows exactly when to trigger connected components
  to re-render.

- ☑️ Doesn't require using Redux/Mobx/Context. While these technologies are
  amazing it always come with a cost. That's why every update happens in folo
  happens locally. The store is just the Maestro.

- ☑️ You can add multiple forms connect them to the store or create branches
  yourself. It's all about `StoreID` my friends.

- ☑️ Friendly code. What you do for a form written in JS, Can do it here. No
  external API. No external functionality. `onSubmit`, `onChange` are still here and
  not going anywhere.

- ☑️ It's well tested code, with nearly 100% of code coverage 🥳

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

### Available Components

```js
import { Form, Field } from "@folo/values";
```

All components accept custom props + children which is required in all except `Field`

<!-- all tables were generated via http://www.tablesgenerator.com/markdown_tables -->

#### Form

| property  | type          | description                                                      | default |
| --------- | ------------- | ---------------------------------------------------------------- | ------- |
| component | node/function | custom render-component                                          | form    |
| onSubmit  | function      | submit function returns values in all cells (event, {...values}) | () {}   |

#### Field

Essential to register values in the store, returns its value when submit.
Accepts all events handlers.

| property  | type          | description                              | default         |
| --------- | ------------- | ---------------------------------------- | --------------- |
| component | node/function | custom render-component                  | div             |
| valueKey  | string        | key used to store value in values object | id or timestamp |
| value     | string        | if type not button                       | ""              |
| checked   | Boolean       | if type button                           | false           |
| type      | Boolean       |                                          | text            |
| groupName | string        | only for button toggle group             |                 |

#### Examples

You can clone all the examples used in this packages
[here](https://github.com/jalal246/folo/tree/master/packages/folo-values/src/stories/examples).
With an example for [Simple
Form](https://jalal246.github.io/folo/?path=/story/forms-forms-with-submit--simple-form)
Or a [Custom
Form](https://jalal246.github.io/folo/?path=/story/forms-forms-with-submit--custom-components)
built with custom components. It includes All [Available
fields](https://jalal246.github.io/folo/?path=/story/forms-available-fields--default-input)
and examples show you how to [handle toggle button groups](https://jalal246.github.io/folo/?path=/story/forms-toggle-groups--group-toggle-no-init-value).

## Test

```sh
yarn test folo-values
```

## License

This project is licensed under the [MIT License](https://github.com/jalal246/folo/blob/master/packages/folo-values/LICENSE)
