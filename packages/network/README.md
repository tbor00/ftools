# @ftools-suit/network

Network is library of Http Request functions.

## Installation

```bash
npm install @ftools-suit/network
```

## How to imports?

```js
import HttpClient, { connection } from '@ftools-suit/network'

// if your goal is to use only fetch
import { connection } from '@ftools-suit/network/fetch'

// if your goal is to use only axios
import HttpClient from '@ftools-suit/network/axios'
```