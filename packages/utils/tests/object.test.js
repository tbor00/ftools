import { objectIsEmpty } from '../src/object'

describe('objectIsEmpty helper', () => {
    it('if we pass an empty object it should return true', () => {
        expect(objectIsEmpty({})).toBe(true)
    })

    it('if we pass an object with properties it should return false', () => {
        expect(objectIsEmpty({ propertyOne: 'Property' })).toBe(false)
    })
})
