import { GeoCoderGeometry } from './gmaps'
export interface GeoLocation {
    lat: number
    lng: number
}

export interface AddressComponents extends GeoLocation {
    country: string
    street: string
    zipCode: string
    neighborhood: string
    state: string
    municipality: string
    streetNumber: string
    fullAddress: string
    geometry: GeoCoderGeometry
    intersection?: any
    plusCode?: string
    premise?: any
    subpremise?: any
    parking?: number
    landmark?: any
    pointInterest?: any
    floor?: number
    room?: any
}

export interface MappedAddress extends AddressComponents {
    address: AddressComponents
}
