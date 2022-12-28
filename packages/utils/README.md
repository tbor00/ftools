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

# **Processing**
This is a module for helpers that deal with processing.

## Query params
To obtain the query parameters of a url

```js
import { getQueryParamsWithProxy } from '@ftools-suit/utils/processing'

// example url: http://localhost:3000?id=3
const { id } = getQueryParamsWithProxy() // 3
```

## Files

To convert bytes to megabytes

```js
import { fileSizeByteToMb } from '@ftools-suit/utils/processing'

fileSizeByteToMb(150000000) // 143 mb
```

To converts bytes to a human readable format

```js
import { bytesConvert } from '@ftools-suit/utils/processing'

bytesConvert(500) // 500 Bytes
bytesConvert(80000) // 78.1 KB
bytesConvert(100000000) // 95.4 MB
```

## Remove accents

To remove accents you can use this method:

```js
import { removeAccents } from '@ftools-suit/utils/processing'

removeAccents('Ananá') // Anana
```

## Data structure validations

To validate if something is undefined you can use:

```js
import { isUndef } from '@ftools-suit/utils/processing'

isUndef(undefined) // true
isUndef(null) // false
```

To validate if something is string you can use:

```js
import { isString } from '@ftools-suit/utils/processing'

isString('This is a string') // true
isString({}) // false
```


To validate if something is a boolean you can use:

```js
import { isBoolean } from '@ftools-suit/utils/processing'

isBoolean(true || false) // true
isBoolean(null) // false
```

To validate if something is a function you can use:

```js
import { isFunction } from '@ftools-suit/utils/processing'

isFunction(() => {}) // true
isFunction({}) // false
```

# **Environment**

To find out if it is a browser

```js
import { isBrowser } from '@ftools-suit/utils/environment'

isBrowser() // true or false
```

To know if we are in Internet Explorer

```js
import { isInternetExplorer } from '@ftools-suit/utils/environment'

isInternetExplorer() // true or false
```

To know if we are in Chrome

```js
import { isChrome } from '@ftools-suit/utils/environment'

isChrome() // true or false
```

To know if we are in React Native

```js
import { isReactNative } from '@ftools-suit/utils/environment'

isReactNative() // true or false
```

To know if we are in Electron

```js
import { isElectron } from '@ftools-suit/utils/environment'

isElectron() // true or false
```

# **Navigator**


To copy to the clipboard

```js
import { copyToClipBoard } from '@ftools-suit/utils/navigator'

copyToClipBoard('email@email.com') // when pressing Ctrl + V the text should be pasted
```

To obtain information about the connected device

```js
import { getDeviceInformation } from '@ftools-suit/utils/navigator'

const device = getDeviceInformation() 
```

To obtain the percentage of battery device

```js
import { getBattery } from '@ftools-suit/utils/navigator'

const battery = getBattery() // 86
```

To obtain the user agent of navigator

```js
import { getUserAgent } from '@ftools-suit/utils/navigator'

const UA = getUserAgent() // Chrome | Firefox, | MSIE, etc...
```

# **Data Structures**

## Object

To validate that it really is an object:

```js
import { isObject } from '@ftools-suit/utils/object'

isObject({}) // true
isObject([]) // false
```

To validate that the object is empty:

```js
import { objectIsEmpty } from '@ftools-suit/utils/object'

objectIsEmpty({}) // true
objectIsEmpty({ name: 'John' }) // false
```

To know if the key exists in the object:

```js
import { objectContains } from '@ftools-suit/utils/object'

objectContains({ name: 'John' }, 'name') // true
objectContains({ name: 'John' }, 'username') // false
```

# Array

To validate that it really is an array:

```js
import { isArray } from '@ftools-suit/utils/array'

isArray([]) // true
isArray({}) // false
```


To validate if an array is empty:

```js
import { isEmptyArray } from '@ftools-suit/utils/array'

isEmptyArray([]) // true
isEmptyArray([{ name: 'John' }]) // false
```

To copy array:

```js
import { copyArray } from '@ftools-suit/utils/array'

const copy = copyArray([{ name: 'John' }]) // [{name: 'John'}]
```

To delete element of array by index position:

```js
import { copyArray } from '@ftools-suit/utils/array'

const users = [{ name: 'John' }, { name: 'Carl' }]
const newArr = deleteElementByIndex(users, 0) // [{ name: 'Carl' }]
```