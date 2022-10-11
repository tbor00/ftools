import { useState, useEffect, useCallback, useRef } from 'react'
import { gmapsApiIsLoaded, miniDebounce } from './helps'

export default function ({ debounce = 300, defaults = {} }) {
    const { place: defaultPlace, shouldPrediction: defaultShouldPrediction, isLoading: defaultIsLoading, status: defaultStatus, data: defaultData } = defaults

    const autocompleteRef = useRef()
    const [place, setPlaceText] = useState('')
    const [predictions, setPredictions] = useState({
        isLoading: false,
        status: '',
        data: []
    })

    const initMap = useCallback(() => {
        if (autocompleteRef.current) return
        if (!gmapsApiIsLoaded(true)) {
            return
        }
        const libPlaces = google?.maps?.places
        autocompleteRef.current = new libPlaces.AutocompleteService()
    }, [])

    /* Clear values of predictions state */
    const clearPredictions = useCallback(() => {
        setPredictions({ isLoading: defaultIsLoading ?? false, status: defaultStatus ?? '', data: defaultData ?? [] })
    }, [defaultIsLoading, defaultStatus, defaultData])

    const getPredictions = useCallback(
        miniDebounce((place) => {
            if (!place) {
                clearPredictions()
                return
            }
            setPredictions((prevPredictions) => ({ ...prevPredictions, isLoading: true }))
            autocompleteRef.current.getPlacePredictions({ input: place }, (data, status) => {
                setPredictions((prevPredictions) => ({ ...prevPredictions, isLoading: false, status: status, data: data ?? [] }))
            })
        }, debounce),
        [clearPredictions, debounce]
    )

    /* A callback function that is used to set the place value and get predictions. */
    const setPlace = useCallback(
        (placeValue, shouldPredictions = true) => {
            setPlaceText(placeValue)
            if (autocompleteRef.current && shouldPredictions) getPredictions(placeValue)
        },
        [getPredictions]
    )

    const getAutoCompleteRef = useCallback(() => {
        return autocompleteRef.current
    }, [autocompleteRef])

    useEffect(() => {
        initMap()
    }, [])

    useEffect(() => {
        defaultPlace && setPlace(defaultPlace, defaultShouldPrediction)
    }, [defaultPlace])

    return { place, predictions, setPlace, clearPredictions, getAutoCompleteRef }
}
