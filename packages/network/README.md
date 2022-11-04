# @ftools-suit/network

Network is library of Http Request functions.

This library is based on two very powerful apis which are fetch and axios.
If you need a super lightweight and super powerful module for making requests, you can use our `connection` api (based on fetch)
If you need a super powerful api with all the features of axios you can use our `HttpClient` api (based on axios)


# **Installation**

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

# **How to use?**

## Connection API REFERENCE
<p>This api is intended for simplified and abbreviated use so that you can speed up development time with a tool based on the native fetch api </p>

🚀 **Features**:

- Super lightweight and extensible
- The connection api is based on fetch, so there are some settings that are the same.

<br>

You can extract the methods you only want to use or you can use the connection object and access all the methods it has from the object. For example:

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

### GET METHOD

a basic request is really simple to set up. Have a look at the following:

```js
connection.get('http://example.com/movies.json')
.then((res) => res.json())
.then((data) => setData(data))
```

you can also write something like this:

```js
async function getMovies(){
    try{
        const fetchMovies = await connection.get('http://example.com/movies.json')
        const data = await fetchMovies.json()
        return data
    }catch(err){
        return err
    }
}
```

The first argument is the url we want to connect to, for example:
```js
const url  = 'http://example.com/movies.json' // url of the request
connection.get(url)
```


The second argument is a object of options, which could look something like this: 

```js
async function getMovies(){
    const options = {
        headers: {
            Authorization: 'Bearer ****',
            timestamp: '****'
        }
    }

    return connection.get('http://example.com/movies.json', options).then((res) => res.json())
}
```

These are all that the second options argument accepts

```json
{
    "params": {},
    "headers": {},
    "withCredentials": {},
    "responseType": {},
    "signal": {}, // AbortController().signal
}
```
