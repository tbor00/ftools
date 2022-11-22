import { gmapsApiIsLoaded } from './helps'
import { GeoCoderReq, GeoCoderResult, AddressComponents, PlaceDetailsReq, PlaceResult, PlaceFromQuery, PlacesServiceStatus, GeoLocation } from './types'

const placesServiceInstance = () => {
    if (!gmapsApiIsLoaded(true)) return null
    return new google.maps.places.PlacesService(document.createElement('div'))
}

export const getGeocode = (args: GeoCoderReq): Promise<GeoCoderResult[] | null> => {
    if (!gmapsApiIsLoaded()) return

    const geocoder = new google.maps.Geocoder()
    return new Promise((resolve, reject) => {
        geocoder.geocode(args, (results, status) => {
            if (status !== 'OK') reject(status)
            if (!args.address && args.componentRestrictions) {
                resolve(results)
            }
            resolve(results)
        })
    })
}

/**
 * It takes a `PlaceDetailsReq` object as an argument, and returns a `Promise` that resolves to a
 * `PlaceResult` object
 * @param {PlaceDetailsReq} args - PlaceDetailsReq
 * @returns A promise that resolves to a PlaceResult
 */
export const getDetails = (args: PlaceDetailsReq): Promise<PlaceResult> => {
    if (!args.placeId) {
        console.error('Ups, placeId was not provided')
        return Promise.reject('placeId was not provided')
    }
    placesServiceInstance()?.getDetails(args, (results: PlaceResult, status: PlacesServiceStatus) => {
        if (status !== 'OK') return Promise.reject(status)
        return Promise.resolve(results)
    })
}

/**
 * `findPlaceFromQuery` takes an object with a `query` property and a `fields` property, and returns a
 * Promise that resolves to an array of `PlaceResult` objects
 * @param {PlaceFromQuery} args - PlaceFromQuery
 */
export const findPlaceFromQuery = (args: PlaceFromQuery): Promise<PlaceResult[] | null> => {
    if (!args.fields || args.query) {
        console.error('fields or query was not provided')
        return Promise.reject('missing arguments')
    }
    placesServiceInstance()?.findPlaceFromQuery(args, (results: PlaceResult[], status: PlacesServiceStatus) => {
        if (status !== 'OK') return Promise.reject(status)
        return Promise.resolve(results)
    })
}

/**
 * It takes a Google Maps API result object and returns an object with the latitude and longitude
 * @param result - The result object returned from the Google Maps API.
 * @returns An object with a lat and lng property.
 */
export const getLatLng = (result: GeoCoderResult) => {
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
export const getZipCode = (result: GeoCoderResult, shortName: boolean = false) => {
    const foundZip = result.address_components.find(({ types }) => types.includes('postal_code'))

    if (!foundZip) return undefined

    return shortName ? foundZip.short_name : foundZip.long_name
}

// Enum of Gmaps address_components
export const AddressComponent = {
    STREET_ADDRESS: 'street_address',
    STREET: 'street',
    STREET_NUMBER: 'street_number',
    ROUTE: 'route',
    NEIGHBORHOOD: 'neighborhood',
    LOCALITY: 'locality',
    SUB_LOCALITY: 'sublocality',
    ADMINISTRATIVE_AREA_LEVEL_1: 'administrative_area_level_1',
    ADMINISTRATIVE_AREA_LEVEL_2: 'administrative_area_level_2',
    POSTAL_CODE: 'postal_code',
    INTERSECTION: 'intersection',
    COUNTRY: 'country',
    PLUS_CODE: 'plus_code',
    PREMISE: 'premise',
    SUBPREMISE: 'subpremise',
    PARKING: 'parking',
    LANDMARK: 'landmark',
    FLOOR: 'floor',
    POINT_INTEREST: 'point_of_interest',
    ROOM: 'room'
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
export const getAddressComponent = (result: GeoCoderResult, addressComponent, shortName: boolean) => {
    const foundAddressComponent = result.address_components.find(({ types }) => {
        types.includes(addressComponent)
    })

    if (!foundAddressComponent) return undefined
    return shortName ? foundAddressComponent.short_name : foundAddressComponent.long_name
}

/**
 * It takes a Google Maps API response and returns an object with the address information
 * @param geoResult - The results from the Google Maps API.
 * @param {GeoLocation} latLang - The latitude and longitude of the address.
 * @param {boolean} [shortName=false] - If true, the short name of the address component is returned. For
 * example, 'CA' instead of 'California'.
 * @returns An object with the following properties:
 * street, postal_code, neighborhood, state, municipality, number, no_ext, ext, int, no_int, address
 */
export const getMappedAddress = (geoResult: GeoCoderResult, latLang: GeoLocation, shortName: boolean = false) => {
    const obj: Partial<AddressComponents> = { lng: latLang.lng, lat: latLang.lat, fullAddress: geoResult.formatted_address, geometry: geoResult.geometry }

    const setItem = (propertieName, infoAddress, useShortName) => {
        obj[propertieName] = useShortName ? infoAddress.short_name : infoAddress.long_name
    }

    geoResult.address_components.forEach((info) => {
        if (info.types.includes(AddressComponent.ROUTE)) {
            setItem('street', info, shortName)
        } else if (info.types.includes(AddressComponent.POSTAL_CODE)) {
            setItem('zipCode', info, shortName)
        } else if (info.types.includes(AddressComponent.SUB_LOCALITY) || info.types.includes(AddressComponent.NEIGHBORHOOD)) {
            setItem('neighborhood', info, shortName)
        } else if (info.types.includes(AddressComponent.ADMINISTRATIVE_AREA_LEVEL_1)) {
            setItem('state', info, shortName)
        } else if (info.types.includes(AddressComponent.LOCALITY)) {
            setItem('municipality', info, shortName)
        } else if (info.types.includes(AddressComponent.STREET_NUMBER)) {
            setItem('streetNumber', info, shortName)
        } else if (info.types.includes(AddressComponent.COUNTRY)) {
            setItem('country', info, shortName)
        } else if (info.types.includes(AddressComponent.PLUS_CODE)) {
            setItem('plusCode', info, shortName)
        } else if (info.types.includes(AddressComponent.PREMISE)) {
            setItem('premise', info, shortName)
        } else if (info.types.includes(AddressComponent.SUBPREMISE)) {
            setItem('subpremise', info, shortName)
        } else if (info.types.includes(AddressComponent.PARKING)) {
            setItem('parking', info, shortName)
        } else if (info.types.includes(AddressComponent.LANDMARK)) {
            setItem('landmark', info, shortName)
        } else if (info.types.includes(AddressComponent.FLOOR)) {
            setItem('floor', info, shortName)
        } else if (info.types.includes(AddressComponent.POINT_INTEREST)) {
            setItem('pointInterest', info, shortName)
        } else if (info.types.includes(AddressComponent.ROOM)) {
            setItem('room', info, shortName)
        } else if (info.types.includes(AddressComponent.INTERSECTION)) {
            setItem('intersection', info, shortName)
        }
    })

    return obj
}

/**
 * It takes a placeId, gets the geocode geoResult, gets the lat and lng from the geocode results, and
 * then returns the mapped address
 * @param {string} placeId - The placeId of the location you want to get the address for.
 * @returns A function that takes a placeId and returns a promise that resolves to an object with the
 */
export const geoMappedAddress = async (placeId: string) => {
    const results = await getGeocode({ placeId: placeId })
    const { lat, lng } = getLatLng(results[0])
    return getMappedAddress(results[0], { lat, lng })
}
