# @ftools-suit/network

Network is library of Http Request functions.

## Installation

Using npm
```bash
npm install @ftools-suit/network
```

Using yarn
```bash
yarn add @ftools-suit/network
```

## How to imports?

```js
import { connection, HttpClient } from '@ftools-suit/network'

// or
const { connection, HttpClient } = require('@ftools-suit/network')
```

<br/>

if your goal is to use only fetch
```js
import { connection } from '@ftools-suit/network/fetch'
```

<br/>

if your goal is to use only axios
```js
import HttpClient from '@ftools-suit/network/axios'
```

