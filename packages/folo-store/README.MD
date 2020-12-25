# 📋 @folo/store

> A JavaScript vanilla store holds and helps control data in forms

## Installation

```sh
npm install @folo/store
```

Store holds data and trigger connected component to update their values when
necessary.

## API

- Subscribe elements to store:

```ts
subscribe({ nameRef: string, initValue: string | Boolean, groupName: string, storeID: string }, updater: function);
```
