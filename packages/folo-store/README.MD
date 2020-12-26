# 📋 @folo/store

> A JavaScript vanilla store holds and helps controlling data in forms

## Installation

```sh
npm install @folo/store
```

Store holds data and trigger connected component to update their values when
necessary. Designed to deal optimally with forms.

## Getting started

Create shared registry for your app. No matter how many forms you have, You need
one registry instance.

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

What's going to happen to update store values and triggers handlers for all
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

This is the only case when functions triggered. Otherwise. data flow will be
from UI to the store until submit is asking for all elements values.
