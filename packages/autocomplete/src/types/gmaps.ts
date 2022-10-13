// GeoCoder types
export type GeoCoderRequest = google.maps.GeocoderRequest
export type GeoCoderResult = google.maps.GeocoderResult

// Places types
export type AutocompletePredictions = google.maps.places.AutocompletePrediction
export type PlacesServiceStatus = `${google.maps.places.PlacesServiceStatus | ''}`
export type AutocompleteService = google.maps.places.AutocompleteService

export interface Gmaps {
    GeoCoderReques: GeoCoderRequest
    GeoCoderResult: GeoCoderResult
}
