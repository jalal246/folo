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

#### Example

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
