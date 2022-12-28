# @ftools-suit/autocomplete

This library focuses on giving google predictions and autocompletions

## Installation

Using npm
```bash
npm install @ftools-suit/autocomplete
```

Using yarn
```bash
yarn add @ftools-suit/autocomplete
```

## How to imports?

```js
import { useAutoComplete, geoMappedAddress, getGeocode, getLatLng, getMappedAddress, getZipCode } from '@ftools-suit/autocomplete'

const { useAutoComplete, geoMappedAddress, getGeocode, getLatLng, getMappedAddress, getZipCode } = require('@ftools-suit/autocomplete')

// OR
import useAutoComplete from '@ftools-suit/autocomplete/react'
const useAutoComplete = require('@ftools-suit/autocomplete/react')
```


## Getting started

This package is based on the [google places autocomplete](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service) service, so we would need to load the library and request an access to google to use its apis.

## APIs

To use this package you need to generate a [google maps api key](https://developers.google.com/maps/documentation/javascript/get-api-key)

### Load the library:

Use the `script` tag to load google maps library in your `index.html` or another entry point

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```



## Create component to use Autocomplete

You can use our hook and with the help of our geocoding functions you can create your own component with the UI of your choice.

```jsx
import useAutocomplete from '@ftools-suit/autocomplete/react'
import { geoMappedAddress } from '@ftools-suit/autocomplete/geocode'

const AddressAutocomplete = ({ onSelectAddress }) => {
    const { place, setPlace, predictions, clearPredictions } = useAutocomplete({
        debounce: 200,
        requestOptions: { 
            componentRestrictions: { country: 'mx' }
         } 
    })

    // Example: San Francisco 223
    const handleOnChange = useCallBack((e) => {
        setPlace(e.target.value)
    }, [])

    const handleSelectPrediction = async (placeId) => {
       clearPredictions() // To clean predictions data
       const address = await geoMappedAddress(placeId) // Return object with a address
       setPlace(address.fullAddress, false) // To set place value and second parameter is so that it does not make a request returned to the api
       onSelectAddress(address)
    }

    const renderPredictions = () => {
        return predictions.data.map((prediction) => (
            <li key={prediction.place_id} onClick={() => handleSelectPrediction(prediction.place_id)} >{prediction.structured_formatting.main_text}</li>
        ))
    }

    return (
        <div>
            <input value={place} onChange={handleOnChange} />
            {!predictions.isLoading && predictions.status === 'OK' && <ul>{renderPredictions()}</ul>}
        </div>
    )
}
```

### API Reference

To improve the autocomplete hook we can pass an object as a parameter to indicate options to it

```js
const autocomplete = useAutocomplete({
    debounce: 200,
    requestOptions: {
        componentRestrictions: { country: ['mx'] } // To filter by country
    },
    customFilters: { state: 'cdmx' }, // To filter by state
    defaults: {
        place: 'San Diego 332'
    }
})
```

### Parameter options (optional)

Options to pass to the hook

| Key | Type | Default | Description |
| -- | -- | -- | -- |
| `debounce` | number | `300` | Milisecons delay before making a request with Google places 
| `requestOptions` | object | `{}` | [Docs](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest)
| `customFilters` | object | `{state: undefined}` | Customizable filters to return predictions
| `defaults` | object | `{ place: '', shouldPrediction: false, isLoading: false, status: '' }` | Defaults value to setter on a hook


## GeoCode

We offer geocoding utility functions for making complex things simple


To obtain results predictions by placeId: 

```js
import { getGeoCode } from '@ftools-suit/autocomplete/geocode'


(async () => {
    const results = await getGeoCode({ placeId: '123kjao02a123c' }) 
})
```

To obtain a final geocoding address and its mapped components:

```js
import { geoMappedAddress } from '@ftools-suit/autocomplete/geocode'

const handleSelect = async (placeId) => {
    const { street, streetNumber, zipCode, neighborhood, state, lat, lng, country, plusCode, subpremise, parking, floor, intersection, fullAddress } = await geoMappedAddress(placeId)
    // Now you can do whatever you want with this data...
}
```


To obtain postal code of an adress: 

```js
import { getZipCode } from '@ftools-suit/autocomplete/geocode'

const results =  GeocoderResult // Object returned by getGeoCode function
getZipCode(results) // '0700'
```
