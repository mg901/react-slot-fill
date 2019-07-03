# React Slot Fill

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
import { Slot, Fill } from '@ips-frontend/react-slot-fill';

const Toolbar = (props) => (
  <div>
    <Slot name="Toolbar.Item" />
  </div>
);

export default Toolbar;

// single Fill
Toolbar.Item = (props) => (
  <Fill name="Toolbar.Item">
    <button>{props.label}</button>
  </Fill>
);

// or multiple Fill
Toolbar.Item = (props) => (
  <>
    <Fill name="Toolbar.Item">
      <button>{props.label}</button>
    </Fill>
    <Fill name="Toolbar.Item">
      <button>{props.label}</button>
    </Fill>
    <Fill name="Toolbar.Item">
      <button>{props.label}</button>
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
import { Provider } from '@ips-frontend/react-slot-fill';

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

### Props

`Slot` and `Fill` components use the same props, which are the following ones:

| Properties | Types  | Default Value | Description                           |
| ---------- | ------ | ------------- | ------------------------------------- |
| name       | string | none          | Determines the name of the Slot/Fill. |

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-slot-fill/blob/master/LICENSE) for more information.
