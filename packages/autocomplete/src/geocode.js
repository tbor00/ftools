import { gmapsApiIsLoaded } from './helps'

export const getGeocode = (args) => {
    if (!gmapsApiIsLoaded()) {
        return
    }

    const geocoder = new window.google.maps.Geocoder()

    return new Promise((resolve, reject) => {
        geocoder.geocode(args, (results, status) => {
            if (status !== 'OK') reject(status)
            if (!args.address && args.componentRestrictions) {
                console.error(geocodeErr)
                resolve(results)
            }
            resolve(results)
        })
    })
}

/**
 * It takes a Google Maps API result object and returns an object with the latitude and longitude
 * @param result - The result object returned from the Google Maps API.
 * @returns An object with a lat and lng property.
 */
export const getLatLng = (result) => {
    const { lat, lng } = result.geometry.location
    return { lat: lat(), lng: lng() }
}

/**
 * "If the result has an address_components property, return the short_name of the first component that
 * has a types property that includes 'postal_code'."
 *
 * The function is a little more complicated than that, but not much
 * @param result - The result object returned from the Google Maps API.
 * @param {boolean} [shortName=false] - If true, returns the short name of the zip code. If false, returns the
 * long name of the zip code.
 * @returns the short_name or long_name of the postal_code.
 */
export const getZipCode = (result, shortName = false) => {
    const foundZip = result.address_components.find(({ types }) => types.includes('postal_code'))

    if (!foundZip) return undefined

    return shortName ? foundZip.short_name : foundZip.long_name
}

// Enum of Gmaps address_components
export const AddressComponent = {
    STREET: 'street',
    STREET_NUMBER: 'street_number',
    ROUTE: 'route',
    NEIGHBORHOOD: 'neighborhood',
    LOCALITY: 'locality',
    SUB_LOCALITY: 'sublocality',
    ADMINISTRATIVE_AREA_LEVEL_1: 'administrative_area_level_1',
    ADMINISTRATIVE_AREA_LEVEL_2: 'administrative_area_level_2',
    POSTAL_CODE: 'postal_code',
    COUNTRY: 'country'
}

/**
 * It takes a Google Maps API result, an address component, and a boolean, and returns the short or
 * long name of the address component
 * @param result - The result object returned from the Google Maps API.
 * @param addressComponent - The type of address component you want to get. For example, if you want to
 * get the city, you would pass in 'locality'
 * @param shortName - If true, the short name of the address component is returned. If false, the long
 * name is returned.
 * @returns the short_name or long_name of the address component that is passed in.
 */
export const getAddressComponent = (result, addressComponent, shortName) => {
    const foundAddressComponent = result.address_components.find(({ types }) => {
        types.includes(addressComponent)
    })

    if (!foundAddressComponent) return undefined
    return shortName ? foundAddressComponent.short_name : foundAddressComponent.long_name
}

/**
 * It takes a Google Maps API response and returns an object with the address information
 * @param results - The results from the Google Maps API.
 * @param {{lat: number, lng: number}} latLang - The latitude and longitude of the address.
 * @param {boolean} [shortName=false] - If true, the short name of the address component is returned. For
 * example, 'CA' instead of 'California'.
 * @returns An object with the following properties:
 * street, postal_code, neighborhood, state, municipality, number, no_ext, ext, int, no_int, address
 */
export const getMappedAddress = (results, latLang, shortName = false) => {
    const obj = { lng: latLang.lng, lat: latLang.lat }
    const setItem = (propertieName, infoAddress, useShortName) => {
        obj[propertieName] = useShortName ? infoAddress.short_name : infoAddress.long_name
    }
    results.address_components.forEach((info) => {
        if (info.types.includes(AddressComponent.ROUTE)) {
            setItem('street', info, shortName)
        } else if (info.types.includes(AddressComponent.POSTAL_CODE)) {
            setItem('postal_code', info, shortName)
        } else if (info.types.includes(AddressComponent.SUB_LOCALITY) || info.types.includes(AddressComponent.NEIGHBORHOOD)) {
            setItem('neighborhood', info, shortName)
        } else if (info.types.includes(AddressComponent.ADMINISTRATIVE_AREA_LEVEL_1)) {
            setItem('state', info, shortName)
        } else if (info.types.includes(AddressComponent.LOCALITY)) {
            setItem('municipality', info, shortName)
        } else if (info.types.includes(AddressComponent.STREET_NUMBER)) {
            setItem('street_number', info, shortName)
        }
    })
    return {
        street: obj.street,
        postal_code: obj.postal_code,
        neighborhood: obj.neighborhood,
        state: obj.state,
        municipality: obj.municipality,
        number: obj.number,
        no_ext: obj.number,
        ext: obj.number,
        int: null,
        no_int: null,
        address: obj
    }
}

/**
 * It takes a placeId, gets the geocode results, gets the lat and lng from the geocode results, and
 * then returns the mapped address
 * @param {string} placeId - The placeId of the location you want to get the address for.
 * @returns A function that takes a placeId and returns a promise that resolves to an object with the
 */
export const geoMappedAddress = async (placeId) => {
    const results = await getGeocode({ placeId: placeId })
    const { lat, lng } = getLatLng(results[0])
    return getMappedAddress(results[0], { lat, lng })
}
