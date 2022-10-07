import { useState, useEffect, useCallback, useRef } from 'react'

export default function (props) {
    const { place: defaultPlace, initialShouldPrediction = false, isLoading: defaultIsLoading, status: defaultStatus, data: defaultData } = props.defaults

    const autocompleteRef = useRef()
    const [place, setPlaceText] = useState('')
    const [predictions, setPredictions] = useState({
        isLoading: false,
        status: '',
        data: []
    })

    const initMap = useCallback(() => {
        if (autocompleteRef.current) return
        const libPlaces = google?.maps?.places
        if (!libPlaces) {
            console.error('Google maps places api is not loaded')
            return
        }
        autocompleteRef.current = new libPlaces.AutocompleteService()
    }, [])

    /* Clear values of predictions state */
    const clearPredictions = useCallback(() => {
        setPredictions({ isLoading: defaultIsLoading ?? false, status: defaultStatus ?? '', data: defaultData ?? [] })
    }, [defaultIsLoading, defaultStatus, defaultData])

    const getPredictions = useCallback((place) => {
        if (!place) {
            clearPredictions()
            return
        }
        setPredictions((prevPredictions) => ({ ...prevPredictions, isLoading: true }))
        autocompleteRef.current.getPlacePredictions({ input: place }, (data, status) => {
            setPredictions((prevPredictions) => ({ ...prevPredictions, isLoading: false, status: status, data: data ?? [] }))
        })
    }, [])

    /**  A callback function that is used to set the place value and get predictions.
     * @param {string} placeValue - name of the place to search
     * @param {boolean} shouldPredictions -
     */
    const setPlace = useCallback(
        (placeValue, shouldPredictions = true) => {
            setPlaceText(placeValue)
            if (autocompleteRef.current && shouldPredictions) getPredictions(placeValue)
        },
        [getPredictions]
    )

    useEffect(() => {
        initMap()
    }, [])

    useEffect(() => {
        defaultPlace && setPlace(defaultPlace, initialShouldPrediction)
    }, [defaultPlace])

    return { place, predictions, setPlace, clearPredictions }
}
