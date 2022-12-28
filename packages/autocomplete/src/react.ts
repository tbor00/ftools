import { useState, useEffect, useCallback, useRef } from 'react'
import { AutocompletePredictions, AutocompleteService, PlacesServiceStatus } from './types'

import { miniDebounce } from '@ftools-suit/utils/debounce'
import { gmapsApiIsLoaded } from './helps'

export type defaultsTypes = {
    place?: string
    shouldPrediction?: boolean
    isLoading?: boolean
    status?: PlacesServiceStatus
    data?: AutocompletePredictions[] | any[]
}

export interface Predictions {
    readonly isLoading: boolean
    readonly status: PlacesServiceStatus
    data: AutocompletePredictions[] | any[]
}

export interface useAutocompleteArgs {
    debounce?: number
    defaults?: defaultsTypes
    requestOptions?: Omit<google.maps.places.AutocompletionRequest, 'input'>
    customFilters?: { state?: string }
}

export interface useAutoCompleteReturn {
    place: string
    predictions: Predictions
    setPlace(place: string, shouldPredictions?: boolean): void
    clearPredictions(): void
    getAutoCompleteRef(): AutocompleteService | undefined
}

export default function ({ debounce = 300, defaults = {}, requestOptions = {}, customFilters = {} }: useAutocompleteArgs = {}): useAutoCompleteReturn {
    const {
        place: defaultPlace,
        shouldPrediction: defaultShouldPrediction,
        isLoading: defaultIsLoading,
        status: defaultStatus,
        data: defaultData
    } = defaults as defaultsTypes

    const [place, setPlaceText] = useState<string>('')
    const [predictions, setPredictions] = useState<Predictions>({
        isLoading: false,
        status: '',
        data: []
    })

    const autocompleteRef = useRef<google.maps.places.AutocompleteService>()
    const requestOptionsRef = useRef(requestOptions)
    const customFiltersRef = useRef(customFilters)

    const initMap = useCallback(() => {
        if (autocompleteRef.current || !gmapsApiIsLoaded(true)) return
        const libPlaces = google?.maps?.places
        autocompleteRef.current = new libPlaces.AutocompleteService()
    }, [])

    /* Clear values of predictions state */
    const clearPredictions = useCallback(() => {
        setPredictions({ isLoading: defaultIsLoading ?? false, status: defaultStatus ?? '', data: defaultData ?? [] })
    }, [defaultIsLoading, defaultStatus, defaultData])

    const filterPredictions = useCallback(
        (data: AutocompletePredictions[]) => {
            if (!data) return []
            const comparable = customFiltersRef.current.state || ''
            return data.filter(({ description }) => {
                description.toLowerCase().includes(comparable.toLowerCase())
            })
        },
        [customFiltersRef]
    )

    const getPredictions = useCallback(
        miniDebounce((place: string) => {
            if (!place) {
                clearPredictions()
                return
            }
            setPredictions((prevPredictions: Predictions) => ({ ...prevPredictions, isLoading: true }))
            autocompleteRef.current?.getPlacePredictions({ ...requestOptionsRef.current, input: place }, (data, status) => {
                const dataFiltered = filterPredictions(data)
                const statusFinal = dataFiltered.length === 0 ? 'ZERO_RESULTS' : status
                setPredictions((prevPredictions: Predictions) => ({ ...prevPredictions, isLoading: false, status: statusFinal, data: dataFiltered }))
            })
        }, debounce),
        [clearPredictions, requestOptionsRef, filterPredictions]
    )

    /* A callback function that is used to set the place value and get predictions. */
    const setPlace = useCallback(
        (placeValue: string, shouldPredictions: boolean = true) => {
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
