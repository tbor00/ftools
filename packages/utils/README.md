# @ftools-suit/utils

This is library of utils functions based for common projects.

## Installation

Using npm
```bash
npm install @ftools-suit/utils
```

Using yarn
```bash
yarn add @ftools-suit/utils
```

## How to imports?

```js
import { getLeftAndTopScreen, getQueryParamsWithProxy } from '@ftools-suit/utils'

const { getLeftAndTopScreen, getQueryParamsWithProxy } = require('@ftools-suit/utils')
```


<br/>

if your goal is to use only events
```js
import { getLeftAndTopScreen } from '@ftools-suit/utils/events'
```

<br/>

if your goal is to use only processing
```js
import { getQueryParamsWithProxy } from '@ftools-suit/utils/processing'
```