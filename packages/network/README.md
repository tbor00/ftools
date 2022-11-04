# @ftools-suit/network

Network is library of Http Request functions.

This library is based on two very powerful apis which are fetch and axios.
If you need a super lightweight and super powerful module for making requests, you can use our `connection` api (based on fetch)
If you need a super powerful api with all the features of axios you can use our `HttpClient` api (based on axios)


# Installation

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

if your goal is to use only connection
```js
import { connection } from '@ftools-suit/network/fetch'
```

<br/>

if your goal is to use only HttpClient
```js
import HttpClient from '@ftools-suit/network/axios'
```

# How to use?

## connection (based on fetch)

you can extract the methods you only want to use or you can use the connection object and access all the methods it has from the object. For example:

```js
import { get, post, put, patch, deleteReq } from '@ftools-suit/network/fetch'

// or

import { connection } from '@ftools-suit/network/fetch'

connection.get()
connection.post()
connection.put()
connection.patch()
connection.delete()
```


