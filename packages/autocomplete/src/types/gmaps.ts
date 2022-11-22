// GeoCoder types
export type GeoCoderRequest = google.maps.GeocoderRequest
export type GeoCoderResult = google.maps.GeocoderResult
export type GeoCoderReq = google.maps.GeocoderRequest
export type GeoCoderGeometry = google.maps.GeocoderGeometry

// Places types
export type AutocompletePredictions = google.maps.places.AutocompletePrediction
export type PlacesServiceStatus = `${google.maps.places.PlacesServiceStatus | ''}`
export type AutocompleteService = google.maps.places.AutocompleteService
export type PlacesService = google.maps.places.PlacesService
export type PlaceDetailsReq = google.maps.places.PlaceDetailsRequest
export type PlaceResult = google.maps.places.PlaceResult
export type PlaceFromQuery = google.maps.places.FindPlaceFromQueryRequest

export interface Gmaps {
    GeoCoderReques: GeoCoderRequest
    GeoCoderResult: GeoCoderResult
    AutocompletePredictions: AutocompletePredictions
    PlacesServiceStatus: PlacesServiceStatus
    AutocompleteService: AutocompleteService
    PlacesService: PlacesService
    PlaceDetailsReq: PlaceDetailsReq
    PlaceResult: PlaceResult
    PlaceFromQuery: PlaceFromQuery
}
