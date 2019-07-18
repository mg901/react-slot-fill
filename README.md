# React Slot Fill

![Travis (.org) branch](https://img.shields.io/travis/mg901/react-slot-fill/master.svg?style=flat-square)

## Install

You can install this library via `npm` or `yarn`.

**npm**

```bash
npm i @mg901/react-slot-fill
```

**yarn**

```bash
yarn add @mg901/react-slot-fill
```

## Use case

If you need to render a component from somepart of the DOM tree, but it needs to be visible in another part of the tree, this library solves it.

## Usage

The usage is really simple:

`toolbar.js`

```js
import React from 'react';
import { Slot, Fill } from '@mg901/react-slot-fill';

const Toolbar = () => (
  <div>
    <Slot name="Toolbar.Item" />
  </div>
);

export default Toolbar;

// single Fill
Toolbar.Item = ({ label }) => (
  <Fill name="Toolbar.Item">
    <button>{label}</button>
  </Fill>
);

// or multiple Fill
Toolbar.Item = ({ label }) => (
  <>
    <Fill name="Toolbar.Item" id="1">
      <button>{label}</button>
    </Fill>
    <Fill name="Toolbar.Item" id="2">
      <button>{label}</button>
    </Fill>
    <Fill name="Toolbar.Item" id="3">
      <button>{label}</button>
    </Fill>
  </>
);
```

`feature.js`

```js
import React from 'react';
import Toolbar from './Toolbar';

const Feature = () => <Toolbar.Item label="My Feature!" />;
```

`app.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from '@mg901/react-slot-fill';

import Toolbar from './Toolbar';
import Feature from './Feature';

const App = () => (
  <Provider>
    <Toolbar />
    <Feature />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## API

### Slot

| Properties | Type   | Required | Default Value                    | Description |
| ---------- | ------ | -------- | -------------------------------- | ----------- |
| name       | string | false    | Determines the name of the Slot. |

### Fill

| Properties | Type             | Default Value | Description  |
| ---------- | ---------------- | ------------- | ------------ |
| name       | string           | none          | Name of Fill |
| id         | string or number | none          | Unique id    |

## License

MIT License

Copyright (c) 2018-2019 [Maxim Alyoshin](https://github.com/mg901).

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/mg901/react-slot-fill/blob/master/LICENCE) file for details.
