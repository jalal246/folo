# 📋 @folo/store

> A Plain JavaScript Store Holds & Helps Controlling Data In Forms

<!-- prettier-ignore-start -->
[![NPM Version](https://img.shields.io/npm/v/@folo/store.svg)](https://www.npmjs.com/package/@folo/store)
[![NPM Download](https://img.shields.io/npm/dt/@folo/store.svg)](https://www.npmjs.com/package/@folo/store)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/@folo/store)
[![npm bundle size (gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://www.npmjs.com/package/@folo/store)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jalal246/folo/blob/master/packages/folo-store/LICENSE)
[![CI](https://img.shields.io/github/workflow/status/jalal246/folo/CI)](https://github.com/jalal246/folo/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/jalal246/folo.svg)](https://codecov.io/gh/jalal246/folo)
<!-- prettier-ignore-end -->

## Installation

```sh
npm install @folo/store
```

A store that holds data and triggers the connected components to update their
values when necessary. Designed to deal optimally with forms.

**How this is going to affect your UI performance?**

Instead of re-mount, all elements exist in the form. This approach
guarantees that only controlled elements in the UI will be triggered. This is
important because usually global store and in most cases means to update all
associated elements.

## Getting started

Create a shared registry for your app. No matter how many forms you have, You
need one registry instance.

```js
import Registry from "@folo/store";

const registry = new Registry();
```

## API

### Subscribe

- Subscribe your elements to the registry:

```ts
registry.subscribe(subscribeInfo: Object<SubscribeInfo>, triggerHandler:? Function);
```

Where `SubscribeInfo: Object` an object contains:

- `nameRef: string` - key reference to the element value.
- `initValue: StoreValue` - Initial value for the element.
- `groupName?: string` - Only for button group.
- `storeID?: string` - In case you are running multiple forms, this value
  creates umbrella branch for you form.

And `triggerHandler: Function` - Triggered when local value needs to be
updated. This is strict to group buttons only.

#### Example for subscribe

```js
const btn1Info = {
  nameRef: "btn1",
  initValue: false,
  groupName: "choices",
};

const btn1Handler = (newValue) => {
  console.log(`I am triggered when my siblings value change! ${newValue}`);
};

registry.subscribe(btn1Info, btn1Handler);

const btn2Info = {
  nameRef: "btn2",
  initValue: true,
  groupName: "choices",
};

const btn2Handler = (newValue) => {
  console.log(`I am triggered when my siblings value change! ${newValue}`);
};

registry.subscribe(btn2Info, btn2Handler);

// ...
registry.subscribe(text1Info, btn2Handler);
registry.subscribe(text2Info, btn2Handler);
```

### updater

- Update value in the registry and triggered handlers if necessary:

```ts
registry.updater(updaterInfo: Object<UpdaterInfo>);
```

Where `updaterInfo: Object` an object contains:

- `nameRef: string` - key reference to the stored element.
- `newValue: StoreValue` - The new value for the element.
- `groupName?: string` - Only for button group.
- `storeID?: string` - In case the element is registered under store id.

What's going to happen is updating store values and trigger handlers for all
buttons boolean values under the same group name toggling their values.

#### Example for updater

- Receive new value:

```js
const btn2NewInfo = {
  nameRef: "btn2",
  newValue: true,
  groupName: "choices",
};

registry.updater(btn2NewInfo);

//

registry.updater(text1NewInfo);
registry.updater(text2NewInfo);
```

So, `btn1Handler` will be triggered with `false`. Why? Since we updated `btn1`
and `btn2` values, UI should be informed to re-render.

This is the only case when functions are triggered. Otherwise. data flow will be
from UI to the store until submit is asking for all elements values.

### getDataByStoreID

- Get store data

```ts
registry.getDataByStoreID(storeID?: string): Object<StoreInfo>
```

### clear

- Clear store data

```ts
registry.clear(storeID?: string)
```

### destroy

- Reset the whole registry

```ts
registry.destroy();
```

## Test

```sh
yarn test folo-store
```

## Implementation

- With react:
  [folo-values](https://github.com/jalal246/folo/tree/master/packages/folo-values)

## Contribution 😇

If you have ideas or issues don't hesitate. You are always welcome.

## License

This project is licensed under the [MIT License](https://github.com/jalal246/folo/blob/master/packages/folo-store/LICENSE)
