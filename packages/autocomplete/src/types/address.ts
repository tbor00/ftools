export interface AddressComponents {
    street: string
    postal_code: string
    neighborhood: string
    state: string
    municipality: string
    number: string
    no_ext: string
    ext: string
    int: string
    no_int: string
    lng: number
    lat: number
}

export interface MappedAddress extends AddressComponents {
    address: AddressComponents
}
