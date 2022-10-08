const ERROR_MESSAGE = {
    NOT_LOADED: 'google maps api is not loaded, for more information visit: https://developers.google.com/maps/documentation/javascript/get-api-key',
    PLACES_NOT_LOADED:
        'google maps api places is not loaded, for more information visit: https://developers.google.com/maps/documentation/javascript/get-api-key'
}

export const gmapsApiIsLoaded = (includePlaces = false) => {
    if (includePlaces && !window?.google?.maps.places) {
        console.error(ERROR_MESSAGE.PLACES_NOT_LOADED)
        return false
    }

    if (!window?.google) {
        console.error(ERROR_MESSAGE.NOT_LOADED)
        return false
    }

    return true
}
