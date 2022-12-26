import { objectIsEmpty, isObject, objectContains } from '../src/object'

describe('object module', () => {
    describe('isObject', () => {
        it('when the parameter is object, should return true', () => {
            expect(isObject({})).toBeTruthy()
        })
        it('when the parameter is not object, should return false', () => {
            expect(isObject('')).toBeFalsy()
        })
    })

    describe('objectIsEmpty', () => {
        it('if we pass an empty object it should return true', () => {
            expect(objectIsEmpty({})).toBe(true)
        })

        it('if we pass an object with properties it should return false', () => {
            expect(objectIsEmpty({ propertyOne: 'Property' })).toBe(false)
        })
    })

    describe('objectContains', () => {
        const objMock = {
            username: 'userNameExample'
        }

        it('when the key exist on object, should return true', () => {
            expect(objectContains(objMock, 'username')).toBeTruthy()
        })

        it('when the key not exist on object, should return false', () => {
            expect(objectContains(objMock, 'name')).toBeFalsy()
        })
    })
})
